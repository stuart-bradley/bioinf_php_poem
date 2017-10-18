<?php
// src/AppBundle/EventListener/EntityListener.php
namespace AppBundle\EventListener;

use AppBundle\Entity\SequenceRun;
use AppBundle\VersionManager\VersionManager;
use Doctrine\DBAL\Schema\Sequence;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\File;
use AppBundle\Uploader\FileUploader;
use Monolog\Logger;
use \Symfony\Component\Debug\Exception\ContextErrorException;

/**
 * Class EntityListener
 * @package AppBundle\EventListener
 */
class EntityListener
{
    /**
     * @var FileUploader
     */
    private $uploader;
    /**
     * @var Logger
     */
    private $logger;

    /**
     * EntityListener constructor.
     * @param FileUploader $uploader
     * @param Logger $logger
     */
    public function __construct(FileUploader $uploader, Logger $logger)
    {
        $this->uploader = $uploader;
        $this->logger = $logger;
    }

    /**
     * Captures pre-presist events.
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if ($entity instanceof File) {
            $this->uploadFile($entity);
        }
    }

    /**
     * Captures pre-update events.
     * @param PreUpdateEventArgs $args
     */
    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();

        if ($entity instanceof File) {
            $this->uploadFile($entity);
        }
    }

    /**
     * Captures pre-remove events.
     * @param LifecycleEventArgs $args
     */
    public function preRemove(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if ($entity instanceof OmicsExperiment or $entity instanceof SequenceRun) {
            $this->deleteFiles($entity);
        }
    }

    /**
     * Uploads file to server.
     * @param File $entity
     */
    private function uploadFile(File $entity)
    {
        $uploadedFile = $entity->getFile();

        if ($uploadedFile != null) {
            $path = sha1(uniqid(mt_rand(), true)) . '-' . $uploadedFile->getClientOriginalName();
            $entity->setPath($path);
            $entity->setSize($uploadedFile->getClientSize());
            $entity->setName($uploadedFile->getClientOriginalName());
            $this->uploader->upload($uploadedFile, $path);
        }
    }

    /**
     * Deletes files from server when parent entity is deleted.
     * @param omicsExperiment|SequenceRun $entity
     */
    private function deleteFiles($entity)
    {
        $files = $entity->getFiles();
        $targetDir = $this->uploader->getTargetDir();
        foreach ($files as $file) {
            // realpath removes stuff like /../
            $fullPath = realpath(join(DIRECTORY_SEPARATOR, array($targetDir, $file->getPath())));
            try {
                unlink($fullPath);
            } catch (ContextErrorException $e) {
                $this->logger->error('File failed to delete: ' . $file->getPath());
                continue;
            }
        }
    }
}