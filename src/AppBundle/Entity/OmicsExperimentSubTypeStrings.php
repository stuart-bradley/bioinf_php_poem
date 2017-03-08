<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * OmicsExperimentSubTypeStrings
 *
 * @ORM\Table(name="sub_type_strings")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\OmicsExperimentSubTypeStringsRepository")
 */
class OmicsExperimentSubTypeStrings
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
     * @ORM\ManyToOne(targetEntity="OmicsExperimentTypeStrings", inversedBy="omicsExperimentSubTypeStrings")
     * @ORM\JoinColumn(name="omics_experiment_type_strings_id", referencedColumnName="id")
     */
    private $omicsExperimentTypeString;

    /**
     * @ORM\OneToMany(targetEntity="OmicsExperimentSubType", mappedBy="omicsExperimentSubTypeString")
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
     * @param string $type
     *
     * @return OmicsExperimentSubTypeStrings
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
     * Add omicsExperimentSubType
     *
     * @param \AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType
     *
     * @return OmicsExperimentSubTypeStrings
     */
    public function addOmicsExperimentSubType(\AppBundle\Entity\OmicsExperimentSubType $omicsExperimentSubType)
    {
        $this->omicsExperimentSubTypes[] = $omicsExperimentSubType;
        $omicsExperimentSubType->setOmicsExperimentSubTypeString($this);

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
     * @return OmicsExperimentSubTypeStrings
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
