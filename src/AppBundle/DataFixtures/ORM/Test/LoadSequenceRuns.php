<?php

// src/AppBundle/DataFixtures/ORM/Test/LoadSequenceRuns.php

namespace AppBundle\DataFixtures\ORM\Test;

use AppBundle\Entity\SequenceRun;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadSequenceRuns extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $sequence_run = new SequenceRun();
        $sequence_run->setRunBy($manager->getRepository('AppBundle:FOSUser')->findAll()[0]);
        $sequence_run->setKit("Illumina");
        $sequence_run->setReadLength(100);
        $sequence_run->setRunCoverageTarget(100);
        $sequence_run->addSample($this->getReference("sample_sequencing_run"));
        $sequence_run->setMaterialTypeString($this->getReference("DNA"));
        $this->setReference("sequence_run_1", $sequence_run);
        $manager->persist($sequence_run);

        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 6;
    }
}