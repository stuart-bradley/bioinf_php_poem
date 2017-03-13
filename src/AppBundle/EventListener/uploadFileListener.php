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
        // upload only works for OmicsExperiment entities
        if (!$entity instanceof OmicsExperiment) {
            return;
        }

        foreach($entity->getUploadedFiles() as $uploadedFile)
        {
            $file = new File();

            /*
             * These lines could be moved to the File Class constructor to factorize
             * the File initialization and thus allow other classes to own Files
             */
            $path = sha1(uniqid(mt_rand(), true)).'-'.$uploadedFile->getClientOriginalName();
            $file->setPath($path);
            $file->setSize($uploadedFile->getClientSize());
            $file->setName($uploadedFile->getClientOriginalName());

            $this->uploader->upload($uploadedFile, $path);

            $entity->addFile($file);

            unset($uploadedFile);
        }
    }
}