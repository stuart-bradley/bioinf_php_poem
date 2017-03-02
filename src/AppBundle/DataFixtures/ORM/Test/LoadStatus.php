<?php

// src/AppBundle/DataFixtures/ORM/Test/LoadStatus.php

namespace AppBundle\DataFixtures\ORM\Test;

use AppBundle\Entity\Status;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadStatus extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $status = new Status();
        $status->setStatusString($this->getReference("Waiting for approval"));
        $this->addReference("status_omics_experiment", $status);
        $manager->persist($status);

        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 5;
    }
}