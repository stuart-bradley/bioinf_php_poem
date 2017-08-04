<?php

// src/AppBundle/DataFixtures/ORM/Data/LoadExcelData.php

namespace AppBundle\DataFixtures\ORM\Data;


use AppBundle\Entity\FOSUser;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\OmicsExperimentSubType;
use AppBundle\Entity\OmicsExperimentType;
use AppBundle\Entity\Sample;
use AppBundle\Entity\Version;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use PHPExcel_Reader_Excel2007;
use PHPExcel_Style_NumberFormat;

class LoadExcelData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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
        // Skips loading if param is empty.
        $file_location = $this->container->getParameter('excel_data_path');
        if ($file_location == "") {
            return;
        }
        $omics_experiments = $this->getOmicsExperimentsFromExcel($file_location);
        $exp_type_genomics = null;
        $exp_sub_type = null;
        $bioControlManager = $this->container->get('app.biocontrol_manager');
        $userManager = $this->container->get('app.user_manager');
        $versionManager = $this->container->get('app.version_manager');

        print("Loading experiments to database." . PHP_EOL);

        $counter = 0;
        $omics_experiment_length = sizeof($omics_experiments);


        foreach ($omics_experiments as $projectName => $omics_experiment_array) {
            $counter += 1;
            print("Loading " . $projectName . " (" . $counter . "/" . $omics_experiment_length . ")" . PHP_EOL);
            // Handle omics_experiment top level.
            $omics_experiment = $manager
                ->getRepository('AppBundle:OmicsExperiment')
                ->findOneBy(array('projectID' => $omics_experiment_array["projectID"]));
            if ($omics_experiment == null) {
                $omics_experiment = new OmicsExperiment();
                $omics_experiment->setProjectName($projectName);
                $omics_experiment->setProjectID($omics_experiment_array["projectID"]);
                $omics_experiment->setCreatedAt(new \DateTime());
                $omics_experiment->setDescription($omics_experiment_array["comments"]);
                $omics_experiment->setRequestedDate($omics_experiment_array["date"]);
                $omics_experiment->setRequestedEndDate($omics_experiment_array["date"]);
                // Create exp_type.
                $exp_type_genomics = new OmicsExperimentType();
                $exp_type_genomics_string = $manager->getRepository('AppBundle:OmicsExperimentTypeStrings')
                    ->findOneBy(array("type" => "Genomics"));
                $exp_type_genomics->setOmicsExperimentTypeString($exp_type_genomics_string);
                $omics_experiment->addOmicsExperimentType($exp_type_genomics);
            } else {
                // Get exp_type.
                $omics_experiment_types = $omics_experiment->getOmicsExperimentTypes();
                foreach ($omics_experiment_types as $exp_type) {
                    if ($exp_type->getOmicsExperimentTypeString()->getType() == "Genomics") {
                        $exp_type_genomics = $exp_type;
                        break;
                    }
                }
            }
            // Handle each individual sample.
            foreach ($omics_experiment_array["samples"] as $sample_name => $sample_row) {
                $BCSampleID = $this->getBCSampleID($sample_row);
                $sample = $manager->getRepository('AppBundle:Sample')->findOneBy(array("BCSampleID" => $BCSampleID));
                if ($sample == null) {
                    $bioControlSample = $bioControlManager->getBioControlSampleNonJSON($BCSampleID);
                    if ($bioControlSample) {
                        $comments = $bioControlSample[1];
                        $bioControlSample = $bioControlSample[0];
                        $sample = new Sample();
                        $sample->setSampleName($sample_row[3]);
                        $sample->setBCSampleID($bioControlSample['SmpID']);
                        $sample->setBCRunID($bioControlSample['RunID']);
                        $sample->setBCExperimentID($bioControlSample['ExpID']);
                        $sample->setSampledDateTime(new \DateTime($bioControlSample['Dat']));
                        $sample->setRNALaterTreated(false);
                        $sample_user = $userManager->findOrCreateUser($sample_row[1]);
                        $sample->setSampledBy($sample_user);

                        if (!$omics_experiment->hasUser($sample_user)) {
                            $omics_experiment->addUser($sample_user);
                        }

                        $sample->setComments($comments);

                        $material_type_string = $manager->getRepository('AppBundle:MaterialTypeStrings')->findOneBy(array("type" => "DNA"));
                        $sample->setMaterialTypeString($material_type_string);

                        $sample_sub_type = $sample_row[5];
                        if ($sample_sub_type == null) {
                            $sample_sub_type = "Strain";
                        }
                        $exp_sub_type = null;
                        foreach ($exp_type_genomics->getOmicsExperimentSubTypes() as $subtype) {
                            if ($subtype->getOmicsExperimentSubTypeString()->getType() == $sample_sub_type) {
                                $exp_sub_type = $subtype;
                                break;
                            }
                        }
                        if ($exp_sub_type == null) {
                            $exp_sub_type_string = $manager->getRepository('AppBundle:OmicsExperimentSubTypeStrings')
                                ->findOneBy(array("type" => $sample_sub_type));
                            $exp_sub_type = new OmicsExperimentSubType();
                            $exp_sub_type->setOmicsExperimentSubTypeString($exp_sub_type_string);
                            $exp_type_genomics->addOmicsExperimentSubType($exp_sub_type);
                        }
                        $exp_sub_type->addSample($sample);
                    }
                }
            }
            $versionManager->createVersion($omics_experiment);
            $manager->persist($omics_experiment);
        }
        $manager->flush();
    }

    /*
     * Opens Excel 2007 file and returns a PHP object of the form:
     *
     * Header:
     * 0 : Date of Submission
     * 1 : Submittor
     * 2 : Project
     * 3 : Sample Name
     * 4 : BioControl Number
     * 5 : Evaluation Type
     * 6 : Timeline
     * 7 : Notes
     * 8 : Seq Run
     * 9 : Extra cell
     *
     * Current Project Structure:
     * Array(
     *      Project_name = Array(
     *          "date" => DateTime,
     *          "projectID" => String,
     *          "samples" = Array(
     *              Sample Name => Array()
     *          )
     *      )
     * )
     */
    private function getOmicsExperimentsFromExcel($inputFileName)
    {
        print("Reading from Excel file." . PHP_EOL);
        $excelReader = new PHPExcel_Reader_Excel2007();
        $excelReader->setReadDataOnly();
        $excelReader->setLoadSheetsOnly($this->container->getParameter('excel_data_worksheet'));

        $spreadsheet = $excelReader->load($inputFileName);
        $worksheet = $spreadsheet->getActiveSheet();

        $current_projects = [];

        foreach ($worksheet->getRowIterator() as $row) {
            // Skips header.
            if ($row->getRowIndex() == 1) {
                continue;
            }
            // Required because IterateOnlyExistingRows doesn't exist.
            if ($this->isRowEmpty($row)) {
                break;
            }
            $cellIterator = $row->getCellIterator();
            // Allows blank values.
            $cellIterator->setIterateOnlyExistingCells(FALSE);
            $project = [];
            foreach ($cellIterator as $cell) {
                if ($cell->getColumn() == "A") {
                    // Converts Excel integer date to formatted string.
                    $date = PHPExcel_Style_NumberFormat::toFormattedString($cell->getValue(), "YYYY-MM-DD");
                    $project[] = new \DateTime($date);
                } else {
                    $project[] = $cell->getValue();
                }
            }
            // Misc projects are denoted by a P00SampleID projectID.
            if ($project[2] == "Other-Please Leave a Note") {
                $projectID = "P00" . $this->getBCSampleID($project);
                $project[2] = $projectID . " " . $project[2];
                $comments = $this->appendComments($project);
                $current_projects[$project[2]] = ["samples" => [$project[3] => $project], "date" => $project[0],
                    "projectID" => $projectID, "comments" => $comments];
                // Project already seen.
            } else if (array_key_exists($project[2], $current_projects)) {
                $current_projects[$project[2]]["samples"][$project[3]] = $project;
                $comments = $current_projects[$project[2]]["comments"];
                $current_projects[$project[2]]["comments"] = $this->appendComments($project, $comments);
                // New Project.
            } else {
                $projectID = $this->getProjectID($project[2]);
                $comments = $this->appendComments($project);
                $current_projects[$project[2]] = ["samples" => [$project[3] => $project], "date" => $project[0],
                    "projectID" => $projectID, "comments" => $comments];
            }
        }
        print("Finished reading from Excel file." . PHP_EOL);
        return $current_projects;
    }

    /*
     * Given a project name like: "P0001 Test Project", return "P0001".
     */
    private function getProjectID($projectName)
    {
        $matches = [];
        $has_matches = preg_match_all("/P\d+/", $projectName, $matches);

        return $matches[0][0];
    }

    /*
     * Creates comments out of columns 7 and 9.
     */
    private function appendComments($project, $comments = "")
    {
        $notes_added = False;
        if (strlen($project[7]) > 0 || strlen($project[9]) > 0) {
            if (strlen($comments) > 0) {
                $comments .= '<br />';
            }
            if (strlen($project[7]) > 0) {
                $comments .= $project[7];
                $notes_added = True;
            }
            if (strlen($project[9]) > 0) {
                if ($notes_added) {
                    $comments .= '<br />';
                }
                $comments .= $project[9];
            }
        }
        return $comments;
    }

    private function getBCSampleID($sample_row)
    {
        if (preg_match("/\d+/", $sample_row[4])) {
            return $sample_row[4];
        } else {
            $split_name = explode('-', $sample_row[3]);
            return $split_name[1];
        }
    }

    /*
     * Required because of possible empty cells.
     */
    private function isRowEmpty($row)
    {
        foreach ($row->getCellIterator() as $cell) {
            if ($cell->getValue()) {
                return false;
            }
        }
        return true;
    }


    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 5;
    }
}
