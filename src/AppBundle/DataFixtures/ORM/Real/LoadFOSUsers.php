<?php

// src/AppBundle/DataFixtures/ORM/Real/LoadMaterialTypeStrings.php

namespace AppBundle\DataFixtures\ORM\Real;

use AppBundle\Entity\FOSUser;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\User;
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
        $userManager = $this->container->get('app.user_manager');
        $userManager->createAllUsers();
        $test_user = $manager->getRepository('AppBundle:FOSUser')->findAll()[0];
        $this->setReference("test_user", $test_user);
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
}