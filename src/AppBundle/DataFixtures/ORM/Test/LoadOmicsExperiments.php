<?php

// src/AppBundle/DataFixtures/ORM/Test/LoadOmicsExperiments.php

namespace AppBundle\DataFixtures\ORM\Test;

use AppBundle\Entity\OmicsExperiment;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadOmicsExperiments extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {

    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 7;
    }
}