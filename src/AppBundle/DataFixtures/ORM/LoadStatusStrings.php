<?php

// src/AppBundle/DataFixtures/ORM/LoadStatusStrings.php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\StatusStrings;

class LoadStatusStrings extends AbstractFixture implements OrderedFixtureInterface {
    public function load(ObjectManager $manager)
    {
        $statuses = [
            "Waiting for approval",
            "Approved",
            "DNA/RNA extraction started",
            "QC before library preparation",
            "Dnase treatment",
            "Ribo depletion",
            "Library prep",
            "Sequencing",
            "Analysis",
            "Complete",
            "On hold",
            "Stopped"
        ];
        foreach($statuses as $status) {
            $statusString = new StatusStrings();
            $statusString -> setType($status);
            $manager -> persist($statusString);
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