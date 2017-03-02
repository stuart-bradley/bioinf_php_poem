<?php

// src/AppBundle/DataFixtures/ORM/Test/LoadOmicsExperimentTypes.php

namespace AppBundle\DataFixtures\ORM\Test;

use AppBundle\Entity\OmicsExperimentType;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadOmicsExperimentTypes extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $omicsExperimentType = new OmicsExperimentType();
        $omicsExperimentType->setOmicsExperimentTypeString($this->getReference("Transcriptomics"));
        $omicsExperimentType->addOmicsExperimentSubType($this->getReference("omics_experiment_sub_type"));
        $this->addReference("omics_experiment_type", $omicsExperimentType);

        $manager->persist($omicsExperimentType);

        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 6;
    }
}