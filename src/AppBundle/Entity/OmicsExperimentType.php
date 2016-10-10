<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * OmicsExperimentType
 *
 * @ORM\Table(name="omics_experiment_type")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OmicsExperimentTypeRepository")
 */
class OmicsExperimentType
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
     * @ORM\Column(name="type", type="integer")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperiment", inversedBy="omicsExperimentTypes")
     * @ORM\JoinColumn(name="omics_experiment_id", referencedColumnName="id")
     */
    private $omicsExperiment;

    /**
     * @ORM\ManyToOne(targetEntity="OmicsExperimentTypeStrings", inversedBy="omicsExperimentTypes")
     * @ORM\JoinColumn(name="omics_experiment_type_strings_id", referencedColumnName="id")
     */
    private $omicsExperimentTypeString;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentSubType", mappedBy="omicsExperimentType")
     */
    private $omicsExperimentSubTypes;

    public function __construct()
    {
        $this->omicsExperimentSubTypes = new ArrayCollection();
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
     * Set type
     *
     * @param integer $type
     *
     * @return OmicsExperimentType
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set omicsExperiment
     *
     * @param \AppBundle\Entity\OmicsExperiment $omicsExperiment
     *
     * @return OmicsExperimentType
     */
    public function setOmicsExperiment(\AppBundle\Entity\OmicsExperiment $omicsExperiment = null)
    {
        $this->omicsExperiment = $omicsExperiment;

        return $this;
    }

    /**
     * Get omicsExperiment
     *
     * @return \AppBundle\Entity\OmicsExperiment
     */
    public function getOmicsExperiment()
    {
        return $this->omicsExperiment;
    }

    /**
     * Add omicsExperimentSubType
     *
     * @param \AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType
     *
     * @return OmicsExperimentType
     */
    public function addOmicsExperimentSubType(\AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType)
    {
        $this->omicsExperimentSubTypes[] = $omicsExperimentSubType;

        return $this;
    }

    /**
     * Remove omicsExperimentSubType
     *
     * @param \AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType
     */
    public function removeOmicsExperimentSubType(\AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType)
    {
        $this->omicsExperimentSubTypes->removeElement($omicsExperimentSubType);
    }

    /**
     * Get omicsExperimentSubTypes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperimentSubTypes()
    {
        return $this->omicsExperimentSubTypes;
    }

    /**
     * Set omicsExperimentTypeString
     *
     * @param \AppBundle\Entity\OmicsExperimentTypeStrings $omicsExperimentTypeString
     *
     * @return OmicsExperimentType
     */
    public function setOmicsExperimentTypeString(\AppBundle\Entity\OmicsExperimentTypeStrings $omicsExperimentTypeString = null)
    {
        $this->omicsExperimentTypeString = $omicsExperimentTypeString;

        return $this;
    }

    /**
     * Get omicsExperimentTypeString
     *
     * @return \AppBundle\Entity\OmicsExperimentTypeStrings
     */
    public function getOmicsExperimentTypeString()
    {
        return $this->omicsExperimentTypeString;
    }
}
