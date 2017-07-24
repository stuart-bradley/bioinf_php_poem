<?php
// src/AppBundle/VersionManager/VersionManager.php
namespace AppBundle\VersionManager;

use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\SequenceRun;
use Doctrine\DBAL\Schema\Sequence;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;

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
     * UserManager constructor.
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * Creates the initial version for an OmicsExperiment.
     * @param OmicsExperiment $entity
     * @param LifecycleEventArgs $args
     */
    public function generateOmicsExperimentCreateVersion(OmicsExperiment $entity, LifecycleEventArgs $args)
    {

    }

    /**
     * Creates a version for an OmicsExperiment.
     * @param OmicsExperiment $entity
     * @param PreUpdateEventArgs $args
     */
    public function generateOmicsExperimentUpdateVersion(OmicsExperiment $entity, PreUpdateEventArgs $args)
    {

    }

    /**
     * Creates the initial version for an SequenceRun.
     * @param SequenceRun $entity
     * @param LifecycleEventArgs $args
     */
    public function generateSequenceRunCreateVersion(SequenceRun $entity, LifecycleEventArgs $args)
    {

    }

    /**
     * Creates a version for an SequenceRun.
     * @param SequenceRun $entity
     * @param PreUpdateEventArgs $args
     */
    public function generateSequenceRunUpdateVersion(SequenceRun $entity, PreUpdateEventArgs $args)
    {

    }
}