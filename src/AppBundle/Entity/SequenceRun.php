<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * SequenceRun
 *
 * @ORM\Table(name="sequence_run")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SequenceRunRepository")
 */
class SequenceRun
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="run_by", type="string")
     */
    private $runBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="start_date", type="date")
     */
    private $startDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="end_dat", type="date")
     */
    private $endDat;

    /**
     * @var string
     *
     * @ORM\Column(name="kit", type="string")
     */
    private $kit;

    /**
     * @var int
     *
     * @ORM\Column(name="material_type", type="integer")
     */
    private $materialType;

    /**
     * @var int
     *
     * @ORM\Column(name="run_coverage_target", type="integer")
     */
    private $runCoverageTarget;

    /**
     * @var int
     *
     * @ORM\Column(name="read_length", type="integer")
     */
    private $readLength;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="sequenceRun")
     */
    private $samples;

    public function __construct()
    {
        $this->samples = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set runBy
     *
     * @param string $runBy
     *
     * @return SequenceRun
     */
    public function setRunBy($runBy)
    {
        $this->runBy = $runBy;

        return $this;
    }

    /**
     * Get runBy
     *
     * @return string
     */
    public function getRunBy()
    {
        return $this->runBy;
    }

    /**
     * Set startDate
     *
     * @param \DateTime $startDate
     *
     * @return SequenceRun
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * Get startDate
     *
     * @return \DateTime
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set endDat
     *
     * @param \DateTime $endDat
     *
     * @return SequenceRun
     */
    public function setEndDat($endDat)
    {
        $this->endDat = $endDat;

        return $this;
    }

    /**
     * Get endDat
     *
     * @return \DateTime
     */
    public function getEndDat()
    {
        return $this->endDat;
    }

    /**
     * Set kit
     *
     * @param string $kit
     *
     * @return SequenceRun
     */
    public function setKit($kit)
    {
        $this->kit = $kit;

        return $this;
    }

    /**
     * Get kit
     *
     * @return string
     */
    public function getKit()
    {
        return $this->kit;
    }

    /**
     * Set materialType
     *
     * @param integer $materialType
     *
     * @return SequenceRun
     */
    public function setMaterialType($materialType)
    {
        $this->materialType = $materialType;

        return $this;
    }

    /**
     * Get materialType
     *
     * @return int
     */
    public function getMaterialType()
    {
        return $this->materialType;
    }

    /**
     * Set runCoverageTarget
     *
     * @param integer $runCoverageTarget
     *
     * @return SequenceRun
     */
    public function setRunCoverageTarget($runCoverageTarget)
    {
        $this->runCoverageTarget = $runCoverageTarget;

        return $this;
    }

    /**
     * Get runCoverageTarget
     *
     * @return int
     */
    public function getRunCoverageTarget()
    {
        return $this->runCoverageTarget;
    }

    /**
     * Set readLength
     *
     * @param integer $readLength
     *
     * @return SequenceRun
     */
    public function setReadLength($readLength)
    {
        $this->readLength = $readLength;

        return $this;
    }

    /**
     * Get readLength
     *
     * @return int
     */
    public function getReadLength()
    {
        return $this->readLength;
    }

    /**
     * Add sample
     *
     * @param \AppBundle\Entity\Sample $sample
     *
     * @return SequenceRun
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples[] = $sample;

        return $this;
    }

    /**
     * Remove sample
     *
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
    }

    /**
     * Get samples
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }
}
