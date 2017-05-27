<?php

// src/AppBundle/DataFixtures/ORM/Real/LoadMaterialTypeStrings.php

namespace AppBundle\DataFixtures\ORM\Real;

use AppBundle\Entity\FOSUser;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Zend\Ldap\Ldap;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadFOSUsers extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }


    public function load(ObjectManager $manager)
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

        $options = array(
            'host' => $this->container->getParameter('ldap_host'),
            'port' => $this->container->getParameter('ldap_port'),
            'useStartTls' => true,
            'username' => $this->container->getParameter('ldap_username'),
            'password' => $this->container->getParameter('ldap_password'),
            'baseDn' => $this->container->getParameter('ldap_baseDn_users')
        );

        $ldap = new Ldap($options);
        $ldap->bind();

        $baseDn = $this->container->getParameter('ldap_baseDn_users');
        $filter = '(&(&(ObjectClass=user))(samaccountname=*))';
        $attributes = ['samaccountname', 'dn', 'memberof', 'cn'];
        $result = $ldap->searchEntries($filter, $baseDn, Ldap::SEARCH_SCOPE_SUB, $attributes);

        $members = [];

        foreach ($result as $item) {
            if (array_key_exists("memberof", $item)) {
                foreach ($item["memberof"] as $group) {
                    $matches = [];
                    preg_match("/CN=([\w\s]+),/", $group, $matches);
                    if (array_key_exists(1, $matches) && array_key_exists($matches[1], $ldap_groups) && !in_array($item["samaccountname"][0], $members)) {
                        $user = $manager
                            ->getRepository('AppBundle:FOSUser')
                            ->findOneBy(array('username' => $item["samaccountname"][0]));
                        if ($user == null) {
                            $user = new FOSUser();
                        }
                        $user->setDn($item["dn"]);
                        $user->setEnabled(1);
                        $user->setUsername($item["samaccountname"][0]);
                        $user->setUsernameCanonical(strtolower($item["samaccountname"][0]));
                        $email = $item["samaccountname"][0] . "@" . $this->container->getParameter('ldap_domain_long');
                        $user->setEmail($email);
                        $user->setEmailCanonical(strtolower($email));
                        $user->setDepartment($ldap_groups[$matches[1]]);
                        $user->setDepartmentDn($group);
                        $user->setCn($item['cn'][0]);
                        $user->setFromBioControl(false);

                        $manager->persist($user);
                        $this->addReference($item["samaccountname"][0], $user);
                        $members[] = $item["samaccountname"][0];
                    }
                }
            }
        }
        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
}