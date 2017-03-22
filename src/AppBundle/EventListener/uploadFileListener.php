<?php
// src/AppBundle/EventListener/uploadFileListener.php
namespace AppBundle\EventListener;

use AppBundle\Entity\SequenceRun;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\File;
use AppBundle\Uploader\FileUploader;
use \Symfony\Component\Debug\Exception\ContextErrorException;
class uploadFileListener
{
    private $uploader;

    public function __construct(FileUploader $uploader, $logger)
    {
        $this->uploader = $uploader;
        $this->logger = $logger;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->uploadFile($entity);
    }

    public function preRemove(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->deleteFiles($entity);
    }

    private function uploadFile($entity)
    {
        // upload only works for File entities
        if ($entity instanceof File) {
            $uploadedFile = $entity->getFile();

            if ($uploadedFile != null) {
                $path = sha1(uniqid(mt_rand(), true)) . '-' . $uploadedFile->getClientOriginalName();
                $entity->setPath($path);
                $entity->setSize($uploadedFile->getClientSize());
                $entity->setName($uploadedFile->getClientOriginalName());
                $this->uploader->upload($uploadedFile, $path);
            }
        }
    }

    private function deleteFiles($entity)
    {
        // delete only works for OmicsExperiment or SequenceRun entities
        if ($entity instanceof OmicsExperiment or $entity instanceof SequenceRun) {
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
}