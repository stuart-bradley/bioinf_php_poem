<?php
// src/AppBundle/UserManager/UserManager.php
namespace AppBundle\UserManager;

use Doctrine\ORM\EntityManager;
use Zend\Ldap\Ldap;
use AppBundle\Entity\FOSUser;

/**
 * Class UserManager
 * @package AppBundle\UserManager
 */
class UserManager
{
    /**
     * @var EntityManager
     */
    private $em;
    /**
     * @var Ldap
     */
    private $ldap;
    /**
     * @var string
     */
    private $ldap_domain_name_long;
    /**
     * @var string
     */
    private $ldap_baseDn_users;

    /**
     * @var array
     */
    private $ldap_groups = array(
        "Team_BioInformatics" => "Bioinformatics",
        "Team_Fermentation" => "Fermentation",
        "Team_Synthetic Biology" => "Synthetic Biology",
        "Team_Eng Process Engineering" => "Process Engineering",
        "Team_Eng Global Operations" => "Engineering",
        "Team_Eng Design Development" => "Engineering",
        "Team_Process Validation" => "Process Validation"
    );

    /**
     * UserManager constructor.
     * @param EntityManager $em
     * @param string $ldap_host
     * @param string $ldap_port
     * @param string $ldap_username
     * @param string $ldap_password
     * @param string $ldap_baseDn_users
     * @param string $ldap_domain_long
     */
    public function __construct(EntityManager $em, $ldap_host, $ldap_port, $ldap_username, $ldap_password, $ldap_baseDn_users, $ldap_domain_long)
    {
        $this->em = $em;

        $options = array(
            'host' => $ldap_host,
            'port' => $ldap_port,
            'useStartTls' => true,
            'username' => $ldap_username,
            'password' => $ldap_password,
            'baseDn' => $ldap_baseDn_users
        );

        $this->ldap = new Ldap($options);
        $this->ldap->bind();

        $this->ldap_baseDn_users = $ldap_baseDn_users;
        $this->ldap_domain_name_long = $ldap_domain_long;

    }

    /**
     * Returns a user or creates one.
     * @param string $name
     * @return FOSUser $user
     */
    public function findOrCreateUser($name)
    {
        $name = $this->convertToSamaccountname($name);
        $user = $this->em
            ->getRepository('AppBundle:FOSUser')
            ->findOneBy(array('username' => $name));

        if ($user) {
            return $user;
        } else {
            $user = $this->createUser($name);
            return $user;
        }
    }

    /**
     * Creates all users from LDAP server which have valid memberof groups defined by
     * $this->ldap_groups.
     */
    public function createAllUsers()
    {
        $filter = '(&(&(ObjectClass=user))(samaccountname=*))';
        $attributes = ['samaccountname', 'dn', 'memberof', 'cn'];
        $result = $this->ldap->searchEntries($filter, $this->ldap_baseDn_users, Ldap::SEARCH_SCOPE_SUB, $attributes);

        foreach ($result as $item) {
            if (array_key_exists("memberof", $item)) {
                if ($this->hasValidDepartment($item["memberof"])) {
                    // $item is wrapped in an array because $this->createUser unwraps single queries
                    // (Which is how LDAP queries are returned by default).
                    $this->createUser($item['cn'][0], array($item));
                }
            }
        }
    }

    /**
     * Updates FOSUser DNs for a set of FOSUsers.
     * @param array $users
     * @return string
     */
    public function updateUsersDn($users)
    {
        $string_result = "";
        foreach ($users as $user) {
            /*  @var FOSUser $user */
            $record = $this->findViaLDAP($user->getUsername());
            if ($record) {
                // Unpack single user query.
                $record = $record[0];
                if ($record["dn"] != $user->getDn()) {
                    $user->setDn($record["dn"]);
                    $string_result .= $user->getUsername() . " DN set to: " . $record["dn"] . PHP_EOL;
                } else {
                    $string_result .= $user->getUsername() . " DN not set (already consistent)." . PHP_EOL;
                }
            }
        }
        return $string_result;
    }

    /**
     * Converts normal names like John Smith to usernames like John.Smith.
     * @param string $name
     * @return string
     */
    private function convertToSamaccountname($name)
    {
        return str_replace(" ", ".", $name);
    }

    /**
     * @param $name
     * @param null|array $ldap_result
     * @return FOSUser
     */
    private function createUser($name, $ldap_result = null)
    {
        $name = $this->convertToSamaccountname($name);
        $user = new FOSUser();
        if ($ldap_result == null) {
            $ldap_result = $this->findViaLDAP($name);
        }
        if ($ldap_result) {
            $ldap_result = $ldap_result[0];
            $user->setDn($ldap_result["dn"]);
            $user->setEnabled(1);
            $user->setUsername($ldap_result["samaccountname"][0]);
            $user->setUsernameCanonical(strtolower($ldap_result["samaccountname"][0]));
            $email = $ldap_result["samaccountname"][0] . "@" . $this->ldap_domain_name_long;
            $user->setEmail($email);
            $user->setEmailCanonical(strtolower($email));
            $this->setDepartmentForUser($user, $ldap_result["memberof"]);
            $user->setCn($ldap_result['cn'][0]);
            $user->setFromBioControl(false);
        } else {
            $user->setUsername($name);
            $user->setUsernameCanonical(strtolower($name));
            $user->setCn(str_replace(".", " ", $name));
            $email = $name . "@" . $this->ldap_domain_name_long;
            $user->setEmail($email);
            $user->setEmailCanonical(strtolower($email));
            $user->setFromBioControl(true);
            $user->setEnabled(0);
        }
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    /**
     * Queries LDAP for accountname and returns result.
     * @param string $samaccountname
     * @return array $result
     */
    private function findViaLDAP($samaccountname)
    {
        $baseDn = $this->ldap_baseDn_users;
        $filter = '(&(&(ObjectClass=user))(samaccountname=' . $samaccountname . '))';
        $attributes = ['samaccountname', 'dn', 'memberof', 'cn', 'mail'];
        $result = $this->ldap->searchEntries($filter, $baseDn, Ldap::SEARCH_SCOPE_SUB, $attributes);

        return $result;
    }

    /**
     * Attempts to set department and departmentDn from LDAP memberof array.
     * @param FOSUser $user
     * @param array $memberof
     * @return bool
     */
    private function setDepartmentForUser(FOSUser $user, $memberof)
    {
        foreach ($memberof as $group) {
            $matches = [];
            preg_match("/CN=([\w\s]+),/", $group, $matches);
            if (array_key_exists(1, $matches) && array_key_exists($matches[1], $this->ldap_groups)) {
                $user->setDepartment($this->ldap_groups[$matches[1]]);
                $user->setDepartmentDn($group);
                return true;
            }
        }
        return false;
    }

    /**
     * Checks whether memberof ldap array contains a valid group.
     * @param array $memberof
     * @return bool
     */
    private function hasValidDepartment($memberof)
    {
        foreach ($memberof as $group) {
            $matches = [];
            preg_match("/CN=([\w\s]+),/", $group, $matches);
            if (array_key_exists(1, $matches) && array_key_exists($matches[1], $this->ldap_groups)) {
                return true;
            }
        }
        return false;
    }
}