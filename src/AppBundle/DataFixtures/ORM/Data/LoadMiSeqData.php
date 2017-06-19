<?php

// src/AppBundle/DataFixtures/ORM/Data/LoadMiSeqData.php

namespace AppBundle\DataFixtures\ORM\Data;

use AppBundle\Entity\MaterialTypeStrings;
use AppBundle\Entity\OmicsExperiment;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use PHPExcel_Reader_Excel2007;
use PHPExcel_Style_NumberFormat;

class LoadMiSeqData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $omics_experiments = $this->getOmicsExperimentsFromExcel('MiSeq Sample Submission Workbook.xlsx');

        foreach ($omics_experiments as $projectName => $omics_experiment_array) {
            $omics_experiment = $manager
                ->getRepository('AppBundle:OmicsExperiment')
                ->findOneBy(array('projectName' => $projectName));
            if ($omics_experiment == null) {
                $omics_experiment = new OmicsExperiment();
                $omics_experiment->setProjectName($projectName);
                $omics_experiment->setCreatedAt(new \DateTime());
                $omics_experiment->setRequestedDate($omics_experiment_array["date"]);
                $omics_experiment->setRequestedEndDate($omics_experiment_array["date"]);
                // Add submittor. - Move user addition to a service? Or maybe a data repository.
            }
        }
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 4;
    }

    private function getOmicsExperimentsFromExcel($inputFileName)
    {
        $excelReader = new PHPExcel_Reader_Excel2007();
        $excelReader->setReadDataOnly();
        $excelReader->setLoadSheetsOnly('Whole Genome Sequencing');

        $spreadsheet = $excelReader->load($inputFileName);
        $worksheet = $spreadsheet->getActiveSheet();

        $current_projects = [];
        $misc_projects = 1;

        foreach ($worksheet->getRowIterator() as $row) {
            if ($row->getRowIndex() == 1) {
                continue;
            }
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE);
            $project = [];
            foreach ($cellIterator as $cell) {
                if ($cell->getColumn() == "A") {
                    $date = PHPExcel_Style_NumberFormat::toFormattedString($cell->getValue(), "YYYY-MM-DD");
                    $project[] = new \DateTime($date);
                } else {
                    $project[] = $cell->getValue();
                }
            }
            if ($project[2] == "Other-Please Leave a Note") {
                $project[3] = "Misc_" . $misc_projects;
                $current_projects[$project[3]] = ["samples" => [$project]];
                $misc_projects += 1;
            } else if (array_key_exists($project[2], $current_projects)) {
                $current_projects[$project[2]]["samples"][$project[3]] = $project;
            } else {
                $current_projects[$project[2]] = ["samples" => [$project[3] => [$project]], "date" => $project[0], "submittor" => $project[1]];
            }
        }

        return $current_projects;
    }
}
