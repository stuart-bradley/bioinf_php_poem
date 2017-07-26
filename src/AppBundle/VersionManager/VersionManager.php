<?php
// src/AppBundle/VersionManager/VersionManager.php
namespace AppBundle\VersionManager;

use AppBundle\Entity\FOSUser;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\SequenceRun;
use AppBundle\Entity\Version;
use Doctrine\DBAL\Schema\Sequence;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

/**
 * Class VersionManager
 * @package AppBundle\VersionManager
 */
class VersionManager
{
    /**
     * @var EntityManager
     */
    private $em;
    /**
     * @var FOSUser
     */
    private $security_service;

    /**
     * UserManager constructor.
     * @param EntityManager $em
     * @param TokenStorage $security_service
     */
    public function __construct(EntityManager $em, TokenStorage $security_service)
    {
        $this->em = $em;
        $this->security_service = $security_service;
    }

    /**
     * Creates an initial base diff of an entity.
     * @param OmicsExperiment | SequenceRun $entity
     */
    public function createVersion($entity)
    {
        $version = new Version();
        $version->setUser($this->security_service->getToken()->getUser());

        $version_diff = [];

        if ($entity instanceof OmicsExperiment) {
            $version_diff = $this->OmicsExperimentCreateDiff($entity);
        } else if ($entity instanceof SequenceRun) {
            $version_diff = $this->SequenceRunCreateDiff($entity);
        }

        $version->setDiff($version_diff);
        $entity->addVersion($version);
    }

    /**
     * Creates an array version of an entity.
     * @param OmicsExperiment $entity
     * @return array
     */
    private function OmicsExperimentCreateDiff(OmicsExperiment $entity)
    {
        $array_diff = [];
        $array_diff['ID'] = $entity->getId();
        $array_diff['Project Name'] = $entity->getProjectName();
        $array_diff['Project ID'] = $entity->getProjectId();
        $array_diff['Requested Date'] = $entity->getRequestedDate();
        // Removes extra <p> tags.
        $array_diff['Description'] = $entity->getDescription();
        $array_diff['Questions'] = $entity->getQuestions();
        $array_diff['Requested End Date'] = $entity->getRequestedEndDate();
        $array_diff['Created At'] = $entity->getCreatedAt();
        $array_diff['Updated At'] = $entity->getUpdatedAt();

        $array_diff['Users'] = array();
        foreach ($entity->getUsers() as $user) {
            $result = array();
            $result['User'] = $user->getCn();
            $array_diff['Users'][$user->getId()] = $result;
        }

        $array_diff['Files'] = array();
        foreach ($entity->getFiles() as $file) {
            $result = array();
            $result['File'] = $file->getName();
            $array_diff['Files'][$file->getId()] = $result;
        }

        $array_diff['Statuses'] = array();
        foreach ($entity->getStatuses() as $status) {
            $result = array();
            $result['Date'] = $status->getDate();
            $result['Status'] = $status->getStatusString()->getType();
            $array_diff['Statuses'][$status->getId()] = $result;
        }

        $array_diff['Omics Experiment Types'] = array();
        foreach ($entity->getOmicsExperimentTypes() as $exptype) {
            $result = array();
            $result['Omics Experiment Type'] = $exptype->getOmicsExperimentTypeString()->getType();
            $result['Omics Experiment Subtypes'] = array();
            foreach ($exptype->getOmicsExperimentSubTypes() as $expsubtype) {
                $sub_result = array();
                $sub_result['Omics Experiment Subtype'] = $expsubtype->getOmicsExperimentSubTypeString()->getType();
                $sub_result['Samples'] = array();
                foreach ($expsubtype->getSamples() as $sample) {
                    $sam_result = array();
                    $sam_result['Sample Name'] = $sample->getSampleName();
                    $sam_result['BC Sample ID'] = $sample->getBCSampleID();
                    $sam_result['BC Run ID'] = $sample->getBCRunID();
                    $sam_result['BC Experiment ID'] = $sample->getBCExperimentID();
                    $sam_result['Sampled By'] = $sample->getSampledBy()->getCn();
                    $sam_result['RNA Later Treated'] = $sample->getRNALaterTreated();
                    $sam_result['Material Type'] = $sample->getMaterialTypeString()->getType();
                    $sub_result['Samples'][$sample->getId()] = $sam_result;
                }
                $result['Omics Experiment Subtypes'][$expsubtype->getId()] = $sub_result;
            }
            $array_diff['Omics Experiment Types'][$exptype->getId()] = $result;
        }

        return $array_diff;
    }
}