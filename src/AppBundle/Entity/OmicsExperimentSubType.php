<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * OmicsExperimentSubType
 *
 * @ORM\Table(name="omics_experiment_sub_type")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OmicsExperimentSubTypeRepository")
 */
class OmicsExperimentSubType
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
     * @ORM\ManyToOne(targetEntity="OmicsExperimentSubTypeStrings", inversedBy="omicsExperimentSubTypes")
     * @ORM\JoinColumn(name="omics_experiment_sub_type_strings_id", referencedColumnName="id")
     */
    private $omicsExperimentSubTypeString;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperimentType", inversedBy="omicsExperimentSubTypes")
     * @ORM\JoinColumn(name="omics_experiment_type_id", referencedColumnName="id")
     */
    private $omicsExperimentType;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="omicsExperimentSubType", cascade="all")
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
     * Set subType
     *
     * @param integer $subType
     *
     * @return OmicsExperimentSubType
     */
    public function setSubType($subType)
    {
        $this->subType = $subType;

        return $this;
    }

    /**
     * Get subType
     *
     * @return int
     */
    public function getSubType()
    {
        return $this->subType;
    }

    /**
     * Set omicsExperimentType
     *
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     *
     * @return OmicsExperimentSubType
     */
    public function setOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType = null)
    {
        $this->omicsExperimentType = $omicsExperimentType;

        return $this;
    }

    /**
     * Get omicsExperimentType
     *
     * @return \AppBundle\Entity\OmicsExperimentType
     */
    public function getOmicsExperimentType()
    {
        return $this->omicsExperimentType;
    }

    /**
     * Add sample
     *
     * @param \AppBundle\Entity\Sample $sample
     *
     * @return OmicsExperimentSubType
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples[] = $sample;
        $sample->setOmicsExperimentSubType($this);

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

    /**
     * Set omicsExperimentSubTypeString
     *
     * @param \AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString
     *
     * @return OmicsExperimentSubType
     */
    public function setOmicsExperimentSubTypeString(\AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString = null)
    {
        $this->omicsExperimentSubTypeString = $omicsExperimentSubTypeString;

        return $this;
    }

    /**
     * Get omicsExperimentSubTypeString
     *
     * @return \AppBundle\Entity\OmicsExperimentSubTypeStrings
     */
    public function getOmicsExperimentSubTypeString()
    {
        return $this->omicsExperimentSubTypeString;
    }
}
