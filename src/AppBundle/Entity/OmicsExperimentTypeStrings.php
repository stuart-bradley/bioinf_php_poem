<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * OmicsExperimentTypeStrings
 *
 * @ORM\Table(name="omics_experiment_type_strings")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OmicsExperimentTypeStringsRepository")
 */
class OmicsExperimentTypeStrings
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
     * @ORM\Column(name="type", type="string")
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentType", mappedBy="omicsExperimentTypeString", cascade="all")
     */
    private $omicsExperimentTypes;


    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentSubTypeStrings", mappedBy="omicsExperimentTypeString", cascade="all")
     */
    private $omicsExperimentSubTypeStrings;

    public function __construct()
    {
        $this->omicsExperimentTypes = new ArrayCollection();
        $this->omicsExperimentSubTypeStrings = new ArrayCollection();
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
     * @param string $type
     *
     * @return OmicsExperimentTypeStrings
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add omicsExperimentType
     *
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     *
     * @return OmicsExperimentTypeStrings
     */
    public function addOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType)
    {
        $this->omicsExperimentTypes[] = $omicsExperimentType;
        $omicsExperimentType->setOmicsExperimentTypeString($this);

        return $this;
    }

    /**
     * Remove omicsExperimentType
     *
     * @param \AppBundle\Entity\OmicsExperimentType $omicsExperimentType
     */
    public function removeOmicsExperimentType(\AppBundle\Entity\OmicsExperimentType $omicsExperimentType)
    {
        $this->omicsExperimentTypes->removeElement($omicsExperimentType);
    }

    /**
     * Get omicsExperimentTypes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperimentTypes()
    {
        return $this->omicsExperimentTypes;
    }

    /**
     * Add omicsExperimentSubTypeString
     *
     * @param \AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString
     *
     * @return OmicsExperimentTypeStrings
     */
    public function addOmicsExperimentSubTypeString(\AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString)
    {
        $this->omicsExperimentSubTypeStrings[] = $omicsExperimentSubTypeString;
        $omicsExperimentSubTypeString->setOmicsExperimentTypeString($this);
        return $this;
    }

    /**
     * Remove omicsExperimentSubTypeString
     *
     * @param \AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString
     */
    public function removeOmicsExperimentSubTypeString(\AppBundle\Entity\OmicsExperimentSubTypeStrings $omicsExperimentSubTypeString)
    {
        $this->omicsExperimentSubTypeStrings->removeElement($omicsExperimentSubTypeString);
    }

    /**
     * Get omicsExperimentSubTypeStrings
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOmicsExperimentSubTypeStrings()
    {
        return $this->omicsExperimentSubTypeStrings;
    }
}
