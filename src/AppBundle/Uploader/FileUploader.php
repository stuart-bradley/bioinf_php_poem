<?php
// src/AppBundle/Uploader/FileUploader.php
namespace AppBundle\Uploader;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $targetDir;

    public function __construct($targetDir)
    {
        $this->targetDir = $targetDir;
    }

    public function upload(UploadedFile $file, $path)
    {
        $file->move($this->targetDir, $path);
    }

    public function getTargetDir()
    {
        return $this->targetDir;
    }
}