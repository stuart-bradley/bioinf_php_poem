<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * SequenceRun
 * @ORM\Table(name="sequence_run")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SequenceRunRepository")
 */
class SequenceRun
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     * @ORM\Column(name="start_date", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $startDate;

    /**
     * @var \DateTime
     * @ORM\Column(name="end_dat", type="date")
     * @Assert\NotBlank()
     * @Assert\Date()
     */
    private $endDate;

    /**
     * @var string
     * @ORM\Column(name="kit", type="string")
     * @Assert\NotBlank()
     */
    private $kit;

    /**
     * @ORM\ManyToOne(targetEntity="MaterialTypeStrings", inversedBy="sequenceRuns")
     * @ORM\JoinColumn(name="material_type_strings_id", referencedColumnName="id")
     * @Assert\NotNull()
     */
    private $materialTypeString;

    /**
     * @var int
     * @ORM\Column(name="run_coverage_target", type="integer")
     * @Assert\NotBlank()
     */
    private $runCoverageTarget;

    /**
     * @var int
     * @ORM\Column(name="read_length", type="integer")
     * @Assert\NotBlank()
     */
    private $readLength;

    /**
     * @ORM\ManyToOne(targetEntity="FOSUser", inversedBy="sequenceRuns")
     * @ORM\JoinColumn(name="fos_user_id", referencedColumnName="id")
     */
    private $runBy;

    /**
     * @var File
     * @ORM\OneToMany(targetEntity="File", mappedBy="sequenceRun", cascade={"persist", "remove"})
     */
    private $files;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="sequenceRun", cascade={"persist", "remove"})
     */
    private $samples;

    public function __construct()
    {
        $this->samples = new ArrayCollection();
        $this->files = new ArrayCollection();
        $this->startDate = new \DateTime();
        $this->endDate = new \DateTime();
    }


    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get runBy
     * @return FOSUser
     */
    public function getRunBy()
    {
        return $this->runBy;
    }

    /**
     * Set runBy
     * @param FOSUser $runBy
     * @return SequenceRun
     */
    public function setRunBy($runBy)
    {
        $this->runBy = $runBy;

        return $this;
    }

    /**
     * Get startDate
     * @return \DateTime
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set startDate
     * @param \DateTime $startDate
     * @return SequenceRun
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * Get endDate
     * @return \DateTime
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set endDate
     * @param \DateTime $endDate
     * @return SequenceRun
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * Get kit
     * @return string
     */
    public function getKit()
    {
        return $this->kit;
    }

    /**
     * Set kit
     * @param string $kit
     * @return SequenceRun
     */
    public function setKit($kit)
    {
        $this->kit = $kit;

        return $this;
    }

    /**
     * Get runCoverageTarget
     * @return int
     */
    public function getRunCoverageTarget()
    {
        return $this->runCoverageTarget;
    }

    /**
     * Set runCoverageTarget
     * @param integer $runCoverageTarget
     * @return SequenceRun
     */
    public function setRunCoverageTarget($runCoverageTarget)
    {
        $this->runCoverageTarget = $runCoverageTarget;

        return $this;
    }

    /**
     * Get readLength
     * @return int
     */
    public function getReadLength()
    {
        return $this->readLength;
    }

    /**
     * Set readLength
     * @param integer $readLength
     * @return SequenceRun
     */
    public function setReadLength($readLength)
    {
        $this->readLength = $readLength;

        return $this;
    }

    /**
     * Add sample
     * @param \AppBundle\Entity\Sample $sample
     * @return SequenceRun
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples[] = $sample;
        $sample->setSequenceRun($this);

        return $this;
    }

    /**
     * Remove sample
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
        $sample->setSequenceRun(null);
    }

    /**
     * Get samples
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }

    /**
     * Get materialTypeString
     * @return \AppBundle\Entity\MaterialTypeStrings
     */
    public function getMaterialTypeString()
    {
        return $this->materialTypeString;
    }

    /**
     * Set materialTypeString
     * @param \AppBundle\Entity\MaterialTypeStrings $materialTypeString
     * @return SequenceRun
     */
    public function setMaterialTypeString(\AppBundle\Entity\MaterialTypeStrings $materialTypeString = null)
    {
        $this->materialTypeString = $materialTypeString;

        return $this;
    }

    /**
     * Add file
     * @param \AppBundle\Entity\File $file
     * @return SequenceRun
     */
    public function addFile(\AppBundle\Entity\File $file)
    {
        $this->files[] = $file;
        $file->setSequenceRun($this);

        return $this;
    }

    /**
     * Remove file
     * @param \AppBundle\Entity\File $file
     */
    public function removeFile(\AppBundle\Entity\File $file)
    {
        $this->files->removeElement($file);
        $file->setSequenceRun(null);
    }

    /**
     * Get files
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFiles()
    {
        return $this->files;
    }
}
