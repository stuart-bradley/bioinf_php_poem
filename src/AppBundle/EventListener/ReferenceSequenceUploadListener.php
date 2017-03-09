<?php
// src/AppBundle/EventListener/ReferenceSequenceUploadListener.php
namespace AppBundle\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\OmicsExperiment;
use AppBundle\Uploader\FileUploader;

class ReferenceSequenceUploadListener
{
    private $uploader;

    public function __construct(FileUploader $uploader)
    {
        $this->uploader = $uploader;
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

    private function uploadFile($entity)
    {
        // upload only works for Product entities
        if (!$entity instanceof OmicsExperiment) {
            return;
        }

        $files = $entity->getReferenceSequence();

        $base_array = [];

        foreach ($files as $f) {
            dump($f);
            $fileName = $this->uploader->upload($f);
            array_push ($base_array, $fileName);
            unset($f);
        }
        $entity->setReferenceSequence($base_array);

    }
}