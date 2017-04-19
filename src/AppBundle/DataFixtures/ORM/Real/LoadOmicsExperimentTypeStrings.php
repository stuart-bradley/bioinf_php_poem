<?php

// src/AppBundle/DataFixtures/ORM/Real/LoadOmicsExperimentTypeStrings.php

namespace AppBundle\DataFixtures\ORM\Real;

use AppBundle\Entity\OmicsExperimentTypeStrings;
use Composer\Installer\PackageEvent;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadOmicsExperimentTypeStrings extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $omicsExperimentTypes = [
            "Transcriptomics" => ["Mutation Analysis", "Contamination Analysis", "Genome Assembly"],
            "Proteomics" => ["Time Course", "Differential Expression"],
            "Metabolomics" => ["Standard"],
            "Genomics" => ["New Strain Genome Sequencing", "Construct Sequencing"]
        ];

        foreach ($omicsExperimentTypes as $experimentType => $children) {
            $omicsExperimentTypeString = $manager
                ->getRepository('AppBundle:OmicsExperimentTypeStrings')
                ->findOneBy(array('type' => $experimentType));
            if ($omicsExperimentTypeString == null) {
                $omicsExperimentTypeString = new OmicsExperimentTypeStrings();
                $omicsExperimentTypeString->setType($experimentType);
            }
            // If existing subtype is in list, return false so it's ignored.
            $remaining_children = $omicsExperimentTypeString->getOmicsExperimentSubTypeStrings()
                ->filter(function ($omicsExperimentSubType) use ($children) {
                    return !(in_array($omicsExperimentSubType->getType(), $children));
                });

            foreach ($remaining_children as $child) {
                $omicsExperimentTypeString->addOmicsExperimentSubTypeString($this->getReference($child));
            }
            $this->addReference($experimentType, $omicsExperimentTypeString);
            $manager->persist($omicsExperimentTypeString);
        }
        $manager->flush();
    }

    // Must be loaded before LoadOmicsExperimentSubTypeStrings.
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 4;
    }
}