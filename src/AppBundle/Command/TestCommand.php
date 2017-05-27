<?php
// src/AppBundle/Command/TestCommand.php
namespace AppBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class TestCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('test:test');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('Whoa!');
    }
}