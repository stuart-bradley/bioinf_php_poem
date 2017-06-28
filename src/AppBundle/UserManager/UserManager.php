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

    /*
     * TODO
     */
    public function updateUser($name)
    {
        $name = $this->convertToSamaccountname($name);
        $user = $this->em
            ->getRepository('AppBundle:FOSUser')
            ->findOneBy(array('username' => $name));
        if ($user) {

        }
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

    private function createUser($name)
    {
        $name = $this->convertToSamaccountname($name);
        $user = new FOSUser();
        $ldap_result = $this->findViaLDAP($name);

        if ($ldap_result) {
            $ldap_result = $ldap_result[0];
            $user->setDn($ldap_result["dn"]);
            $user->setEnabled(1);
            $user->setUsername($ldap_result["samaccountname"][0]);
            $user->setUsernameCanonical(strtolower($ldap_result["samaccountname"][0]));

            $user->setEmail($ldap_result["mail"][0]);
            $user->setEmailCanonical($ldap_result["mail"][0]);
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
     * Attempts to set department and departmentDn from LDAP memberof array.
     * @param FOSUser $user
     * @param array $memberof
     * @return bool
     */
    private function setDepartmentForUser(FOSUser $user, $memberof)
    {
        $ldap_groups = array(
            "Team_BioInformatics" => "Bioinformatics",
            "Team_Fermentation" => "Fermentation",
            "Team_Synthetic Biology" => "Synthetic Biology",
            "Team_Eng Process Engineering" => "Process Engineering",
            "Team_Eng Global Operations" => "Engineering",
            "Team_Eng Design Development" => "Engineering",
            "Team_Process Validation" => "Process Validation"
        );

        foreach ($memberof as $group) {
            $matches = [];
            preg_match("/CN=([\w\s]+),/", $group, $matches);
            if (array_key_exists(1, $matches) && array_key_exists($matches[1], $ldap_groups)) {
                $user->setDepartment($ldap_groups[$matches[1]]);
                $user->setDepartmentDn($group);
                return true;
            }
        }
        return false;
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


}