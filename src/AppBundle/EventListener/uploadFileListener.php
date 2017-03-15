<?php
// src/AppBundle/EventListener/uploadFileListener.php
namespace AppBundle\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\File;
use AppBundle\Uploader\FileUploader;

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
        $this->logger->info('persist');
        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->uploadFile($entity);

        $this->logger->info('update');
    }

    private function uploadFile($entity)
    {
        // upload only works for OmicsExperiment entities
        if (!$entity instanceof File) {
            return;
        }

        $uploadedFile = $entity->getFile();

        if ($uploadedFile != null) {
            $path = sha1(uniqid(mt_rand(), true)).'-'.$uploadedFile->getClientOriginalName();
            $entity->setPath($path);
            $entity->setSize($uploadedFile->getClientSize());
            $entity->setName($uploadedFile->getClientOriginalName());
        }
    }
}