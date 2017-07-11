<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;


/**
 * StatusStrings
 * @ORM\Table(name="status_strings")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\StatusStringsRepository")
 */
class StatusStrings
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="type", type="string")
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="Status", mappedBy="statusString")
     */
    private $statuses;

    public function __construct()
    {
        $this->statuses = new ArrayCollection();
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
     * Set type
     * @param string $type
     * @return StatusStrings
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add status
     * @param \AppBundle\Entity\Status $status
     * @return StatusStrings
     */
    public function addStatus(\AppBundle\Entity\Status $status)
    {
        $this->statuses[] = $status;
        $status->setStatusString($this);

        return $this;
    }

    /**
     * Remove status
     * @param \AppBundle\Entity\Status $status
     */
    public function removeStatus(\AppBundle\Entity\Status $status)
    {
        $this->statuses->removeElement($status);
    }

    /**
     * Get statuses
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStatuses()
    {
        return $this->statuses;
    }
}
