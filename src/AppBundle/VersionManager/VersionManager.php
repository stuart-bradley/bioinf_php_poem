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
        $array_diff['id'] = $entity->getId();
        $array_diff['projectName'] = $entity->getProjectName();
        $array_diff['projectId'] = $entity->getProjectId();
        return $array_diff;
    }
}