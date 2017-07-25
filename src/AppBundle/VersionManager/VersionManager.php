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
     * Creates the initial version for an OmicsExperiment.
     * @param OmicsExperiment $entity
     */
    public function generateOmicsExperimentCreateVersion(OmicsExperiment $entity)
    {
        $version = new Version();
        $version->setUser($this->security_service->getToken()->getUser());

        $version_diff = [];

        foreach (get_object_vars($entity) as $key => $value) {
            $version_diff[$key] = $value;
        }

        $version->setDiff($version_diff);
        $entity->addVersion($version);
    }

    /**
     * Creates a version for an OmicsExperiment.
     * @param OmicsExperiment $entity
     * @param PreUpdateEventArgs $args
     */
    public function generateOmicsExperimentUpdateVersion(OmicsExperiment $entity, PreUpdateEventArgs $args)
    {
        $version = new Version();
        $version->setUser($this->security_service->getToken()->getUser());

        $version_diff = [];

        $parentChanges = $args->getEntityChangeSet();

        $version_diff[] = $parentChanges;

        $version->setDiff($version_diff);
        $entity->addVersion($version);
    }

    /**
     * Creates the initial version for an SequenceRun.
     * @param SequenceRun $entity
     * @param LifecycleEventArgs $args
     */
    public function generateSequenceRunCreateVersion(SequenceRun $entity, LifecycleEventArgs $args)
    {
        $version = new Version();
        $version->setUser($this->security_service->getToken()->getUser());

        $entity->addVersion($version);
    }

    /**
     * Creates a version for an SequenceRun.
     * @param SequenceRun $entity
     * @param PreUpdateEventArgs $args
     */
    public function generateSequenceRunUpdateVersion(SequenceRun $entity, PreUpdateEventArgs $args)
    {
        $version = new Version();
        $version->setUser($this->security_service->getToken()->getUser());

        $parentChanges = $args->getEntityChangeSet();

        $entity->addVersion($version);
    }
}