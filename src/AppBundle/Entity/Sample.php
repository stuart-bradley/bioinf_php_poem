<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Sample
 *
 * @ORM\Table(name="sample")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SampleRepository")
 */
class Sample
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
     * @var int
     *
     * @ORM\Column(name="bcexperiment_id", type="integer", nullable=true)
     *
     */
    private $BCExperimentID;

    /**
     * @var int
     *
     * @ORM\Column(name="bcsample_id", type="integer", nullable=true)
     *
     */
    private $BCSampleID;

    /**
     * @var int
     *
     * @ORM\Column(name="bcrun_id", type="integer", nullable=true)
     *
     */
    private $BCRunID;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="sampled_date_time", type="datetime")
     *
     * @Assert\NotBlank()
     */
    private $sampledDateTime;

    /**
     * @var bool
     *
     * @ORM\Column(name="rnalater_treated", type="boolean")
     *
     */
    private $RNALaterTreated;

    /**
     * @ORM\ManyToOne(targetEntity="FOSUser", inversedBy="samples")
     * @ORM\JoinColumn(name="fos_user_id", referencedColumnName="id")
     */
    private $sampledBy;

    /**
     * @ORM\ManyToOne(targetEntity="MaterialTypeStrings", inversedBy="samples")
     * @ORM\JoinColumn(name="material_type_strings_id", referencedColumnName="id")
     */
    private $materialTypeString;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperimentSubType", inversedBy="samples")
     * @ORM\JoinColumn(name="omics_experiment_sub_type_id", referencedColumnName="id")
     * @Assert\NotNull()
     */
    private $omicsExperimentSubType;

    /**
     * @ORM\ManyToOne(targetEntity="SequenceRun", inversedBy="samples")
     * @ORM\JoinColumn(name="sequence_run_id", referencedColumnName="id")
     */
    private $sequenceRun;

    public function __construct()
    {
        $this->sampledDateTime = new \DateTime();
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
     * Set bCExperimentID
     *
     * @param integer $bCExperimentID
     *
     * @return Sample
     */
    public function setBCExperimentID($bCExperimentID)
    {
        $this->BCExperimentID = $bCExperimentID;

        return $this;
    }

    /**
     * Get bCExperimentID
     *
     * @return int
     */
    public function getBCExperimentID()
    {
        return $this->BCExperimentID;
    }

    /**
     * Set bCSampleID
     *
     * @param integer $bCSampleID
     *
     * @return Sample
     */
    public function setBCSampleID($bCSampleID)
    {
        $this->BCSampleID = $bCSampleID;

        return $this;
    }

    /**
     * Get bCSampleID
     *
     * @return int
     */
    public function getBCSampleID()
    {
        return $this->BCSampleID;
    }

    /**
     * Set bCRunID
     *
     * @param integer $bCRunID
     *
     * @return Sample
     */
    public function setBCRunID($bCRunID)
    {
        $this->BCRunID = $bCRunID;

        return $this;
    }

    /**
     * Get bCRunID
     *
     * @return int
     */
    public function getBCRunID()
    {
        return $this->BCRunID;
    }

    /**
     * Set sampledBy
     *
     * @param FOSUser $sampledBy
     *
     * @return Sample
     */
    public function setSampledBy($sampledBy)
    {
        $this->sampledBy = $sampledBy;

        return $this;
    }

    /**
     * Get sampledBy
     *
     * @return FOSUser
     */
    public function getSampledBy()
    {
        return $this->sampledBy;
    }

    /**
     * Set rNALaterTreated
     *
     * @param boolean $rNALaterTreated
     *
     * @return Sample
     */
    public function setRNALaterTreated($rNALaterTreated)
    {
        $this->RNALaterTreated = $rNALaterTreated;

        return $this;
    }

    /**
     * Get rNALaterTreated
     *
     * @return bool
     */
    public function getRNALaterTreated()
    {
        return $this->RNALaterTreated;
    }

    /**
     * Set omicsExperimentSubType
     *
     * @param \AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType
     *
     * @return Sample
     */
    public function setOmicsExperimentSubType(\AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType = null)
    {
        $this->omicsExperimentSubType = $omicsExperimentSubType;

        return $this;
    }

    /**
     * Get omicsExperimentSubType
     *
     * @return \AppBundle\Entity\OmicsExperimentSubType
     */
    public function getOmicsExperimentSubType()
    {
        return $this->omicsExperimentSubType;
    }

    /**
     * Set sequenceRun
     *
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     *
     * @return Sample
     */
    public function setSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun = null)
    {
        $this->sequenceRun = $sequenceRun;

        return $this;
    }

    /**
     * Get sequenceRun
     *
     * @return \AppBundle\Entity\SequenceRun
     */
    public function getSequenceRun()
    {
        return $this->sequenceRun;
    }

    /**
     * Set materialTypeString
     *
     * @param \AppBundle\Entity\MaterialTypeStrings $materialTypeString
     *
     * @return Sample
     */
    public function setMaterialTypeString(\AppBundle\Entity\MaterialTypeStrings $materialTypeString = null)
    {
        $this->materialTypeString = $materialTypeString;

        return $this;
    }

    /**
     * Get materialTypeString
     *
     * @return \AppBundle\Entity\MaterialTypeStrings
     */
    public function getMaterialTypeString()
    {
        return $this->materialTypeString;
    }

    /**
     * Set sampledDateTime
     *
     * @param \DateTime $sampledDateTime
     *
     * @return Sample
     */
    public function setSampledDateTime($sampledDateTime)
    {
        $this->sampledDateTime = $sampledDateTime;

        return $this;
    }

    /**
     * Get sampledDateTime
     *
     * @return \DateTime
     */
    public function getSampledDateTime()
    {
        return $this->sampledDateTime;
    }
}
