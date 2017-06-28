<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use AppBundle\Entity\OmicsExperiment;

/**
 * @ORM\Table(name="files")
 * @ORM\Entity
 */
class File
{
    /**
     * @var integer
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="path", type="string", length=255)
     */
    private $path;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var integer
     * @ORM\Column(name="size", type="integer")
     */
    private $size;

    /**
     * @var UploadedFile
     */
    private $file;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperiment", inversedBy="files")
     * @ORM\JoinColumn(name="omics_experiment_id", referencedColumnName="id")
     **/
    private $omicsExperiment;

    /**
     * @ORM\ManyToOne(targetEntity="SequenceRun", inversedBy="files")
     * @ORM\JoinColumn(name="sequence_run_id", referencedColumnName="id")
     **/
    private $sequenceRun;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set path
     * @param string $path
     * @return File
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set name
     * @param string $name
     * @return File
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set size
     * @param integer $size
     * @return File
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get file
     * @return UploadedFile
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set size
     * @param UploadedFile $file
     * @return File
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get size
     * @return integer
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set omicsExperiment
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     * @return File
     */
    public function setOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment = null)
    {
        $this->omicsExperiment = $omicsExperiment;

        return $this;
    }

    /**
     * Get omicsExperiment
     * @return \AppBundle\Entity\OmicsExperiment
     */
    public function getOmicsExperiment()
    {
        return $this->omicsExperiment;
    }

    /**
     * Set sequenceRun
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     * @return File
     */
    public function setSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun = null)
    {
        $this->sequenceRun = $sequenceRun;

        return $this;
    }

    /**
     * Get sequenceRun
     * @return \AppBundle\Entity\SequenceRun
     */
    public function getSequenceRun()
    {
        return $this->sequenceRun;
    }
}
