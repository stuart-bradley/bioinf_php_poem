<?php
// src/AppBundle/Uploader/FileUploader.php
namespace AppBundle\Uploader;

use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FileUploader
 * @package AppBundle\Uploader
 */
class FileUploader
{
    /**
     * @var string
     */
    private $targetDir;

    /**
     * FileUploader constructor.
     * @param string $targetDir
     */
    public function __construct($targetDir)
    {
        $this->targetDir = $targetDir;
    }

    /**
     * @param UploadedFile $file
     * @param string $path
     */
    public function upload(UploadedFile $file, $path)
    {
        $file->move($this->targetDir, $path);
    }

    /**
     * @return string
     */
    public function getTargetDir()
    {
        return $this->targetDir;
    }
}