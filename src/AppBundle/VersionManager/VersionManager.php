<?php
// src/AppBundle/VersionManager/VersionManager.php
namespace AppBundle\VersionManager;

use AppBundle\Entity\FOSUser;
use AppBundle\Entity\OmicsExperimentSubType;
use AppBundle\Entity\OmicsExperimentType;
use AppBundle\Entity\Sample;
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

        $version_hydration = [];

        if ($entity instanceof OmicsExperiment) {
            $version_hydration = $this->OmicsExperimentCreateHydration($entity);
        } else if ($entity instanceof SequenceRun) {
            $version_hydration = $this->SequenceRunCreateHydration($entity);
        } else {
            $version_hydration = [];
        }

        $version->setHydration($version_hydration);
        $version->setDiff($version_hydration);
        $entity->addVersion($version);
    }

    /**
     * Creates an array version of an entity.
     * @param SequenceRun $entity
     * @return array
     */
    private function SequenceRunCreateHydration($entity)
    {
        $array_hydration = [];
        $array_hydration['ID'] = $entity->getId();
        $array_hydration['Start Date'] = $entity->getStartDate();
        $array_hydration['End Date'] = $entity->getEndDate();
        $array_hydration['Kit'] = $entity->getKit();
        $array_hydration['Material Type'] = $entity->getMaterialTypeString()->getType();
        $array_hydration['Run Coverage Target'] = $entity->getRunCoverageTarget();
        $array_hydration['Read Length'] = $entity->getReadLength();
        $array_hydration['Created At'] = $entity->getCreatedAt();
        $array_hydration['Updated At'] = $entity->getUpdatedAt();

        $array_hydration['Users'] = array();
        foreach ($entity->getUsers() as $user) {
            $result = array();
            $result['User'] = $user->getCn();
            $array_hydration['Users'][$user->getId()] = $result;
        }

        $array_hydration['Files'] = array();
        foreach ($entity->getFiles() as $file) {
            $result = array();
            $result['File'] = $file->getName();
            $array_hydration['Files'][$file->getId()] = $result;
        }

        $array_hydration['Samples'] = array();
        foreach ($entity->getSamples() as $sample) {
            $result = array();
            $result['Sample Name'] = $sample->getSampleName();
            $result['BC Sample ID'] = $sample->getBCSampleID();
            $result['BC Run ID'] = $sample->getBCRunID();
            $result['BC Experiment ID'] = $sample->getBCExperimentID();
            $result['Sampled By'] = $sample->getSampledBy()->getCn();
            $result['RNA Later Treated'] = $sample->getRNALaterTreated();
            $result['Material Type'] = $sample->getMaterialTypeString()->getType();
            $array_hydration['Samples'][$sample->getId()] = $result;
        }

        return $array_hydration;
    }

    /**
     * Creates an array version of an entity.
     * @param OmicsExperiment $entity
     * @return array
     */
    private function OmicsExperimentCreateHydration(OmicsExperiment $entity)
    {
        $array_hydration = [];
        $array_hydration['ID'] = $entity->getId();
        $array_hydration['Project Name'] = $entity->getProjectName();
        $array_hydration['Project ID'] = $entity->getProjectId();
        $array_hydration['Requested Date'] = $entity->getRequestedDate();
        $array_hydration['Description'] = $entity->getDescription();
        $array_hydration['Questions'] = $entity->getQuestions();
        $array_hydration['Requested End Date'] = $entity->getRequestedEndDate();
        $array_hydration['Created At'] = $entity->getCreatedAt();
        $array_hydration['Updated At'] = $entity->getUpdatedAt();

        $array_hydration['Users'] = array();
        foreach ($entity->getUsers() as $user) {
            $result = array();
            $result['User'] = $user->getCn();
            $array_hydration['Users'][$user->getId()] = $result;
        }

        $array_hydration['Files'] = array();
        foreach ($entity->getFiles() as $file) {
            $result = array();
            $result['File'] = $file->getName();
            $array_hydration['Files'][$file->getId()] = $result;
        }

        $array_hydration['Statuses'] = array();
        foreach ($entity->getStatuses() as $status) {
            $result = array();
            $result['Date'] = $status->getDate();
            $result['Status'] = $status->getStatusString()->getType();
            $array_hydration['Statuses'][$status->getId()] = $result;
        }

        $array_hydration['Omics Experiment Types'] = array();
        foreach ($entity->getOmicsExperimentTypes() as $exptype) {
            /** @var OmicsExperimentType $exptype */
            $result = array();
            $result['Omics Experiment Type'] = $exptype->getOmicsExperimentTypeString()->getType();
            $result['Omics Experiment Subtypes'] = array();
            foreach ($exptype->getOmicsExperimentSubTypes() as $expsubtype) {
                /** @var OmicsExperimentSubType $expsubtype */
                $sub_result = array();
                $sub_result['Omics Experiment Subtype'] = $expsubtype->getOmicsExperimentSubTypeString()->getType();
                $sub_result['Samples'] = array();
                foreach ($expsubtype->getSamples() as $sample) {
                    /** @var Sample $sample */
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
            $array_hydration['Omics Experiment Types'][$exptype->getId()] = $result;
        }

        return $array_hydration;
    }
}