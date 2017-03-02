<?php

// src/AppBundle/DataFixtures/ORM/Test/LoadSamples.php

namespace AppBundle\DataFixtures\ORM\Test;

use AppBundle\Entity\Sample;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadSamples extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $sample = new Sample();
        $sample->setBCExperimentID(1);
        $sample->setBCSampleID(1);
        $sample->setBCRunID(1);
        $sample->setSampledBy("stuart.bradley");
        $sample->setRNALaterTreated(true);
        $sample->setMaterialTypeString($this->getReference("DNA"));
        $this->addReference("sample_sequencing_run", $sample);
        $manager->persist($sample);

        $sample = new Sample();
        $sample->setBCExperimentID(123);
        $sample->setBCSampleID(1);
        $sample->setBCRunID(1);
        $sample->setSampledBy("stuart.bradley");
        $sample->setRNALaterTreated(true);
        $sample->setMaterialTypeString($this->getReference("DNA"));
        $this->addReference("sample_omics_experiment", $sample);
        $manager->persist($sample);

        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 5;
    }
}