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
        $omicsExperiment = new OmicsExperiment();
        $omicsExperiment->setProjectName("Project 1");
        $omicsExperiment->setRequestedBy($this->getReference("Stuart.Bradley"));
        $omicsExperiment->setDescription("The Description");
        $omicsExperiment->setQuestions("The Questions");
        $omicsExperiment->addStatus($this->getReference("status_omics_experiment"));
        $omicsExperiment->addOmicsExperimentType($this->getReference("omics_experiment_type"));

        $this->setReference("omics_experiment_1", $omicsExperiment);
        $manager->persist($omicsExperiment);

        $manager->flush();
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 7;
    }
}