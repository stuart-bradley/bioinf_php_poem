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
     * @ORM\OneToMany(targetEntity="OmicsExperimentType", mappedBy="omicsExperimentTypeString")
     */
    private $omicsExperimentTypes;

    public function __construct()
    {
        $this->omicsExperimentTypes = new ArrayCollection();
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
}
