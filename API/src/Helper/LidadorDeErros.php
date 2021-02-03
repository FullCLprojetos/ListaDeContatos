<?php
namespace App\Helper;

use Psr\Log\LogLevel;
use Psr\Log\LoggerInterface;
use App\Helper\ResponseFactory;
use Doctrine\DBAL\Exception\DriverException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LidadorDeErros implements EventSubscriberInterface
{
    public $logger;
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger; //não funciona, provavelmente algum problema com o monolog
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::EXCEPTION=>[
                ['handle404Exception', -1],
                ['AppError', 1],
                ['handleGenericException', 0]
        ]];
    }
    public function AppError(ExceptionEvent $event){
        if ($event->getThrowable()instanceof AppError)
        {
            $this->logger->error('Um Erro interno ocorreu. {stack}', ['stack'=> $event->getThrowable()->getTraceAsString()]);
            $response = ResponseFactory::Erro($event->getThrowable());
            $event->setResponse($response->getResponse());
        }
        if ($event->getThrowable()instanceof DriverException)
        {
            $this->logger->error('Uma exceção ocorreu. {stack}', ['stack'=> $event->getThrowable()->getTraceAsString()]);
            $response = ResponseFactory::Erro($event->getThrowable());
            $event->setResponse($response->getResponse());
        }
    }
    public function handle404Exception(ExceptionEvent $event)
    {
        if ($event->getThrowable()instanceof NotFoundHttpException)
        {
            $this->logger->error('Uma exceção ocorreu. {stack}', ['stack'=> $event->getThrowable()->getTraceAsString()]);
            $response = ResponseFactory::Erro($event->getThrowable());
            $event->setResponse($response->getResponse());
        }
    }
    function handleGenericException(ExceptionEvent $event)
    {
        $this->logger->error('Uma exceção ocorreu. {stack}', ['stack'=> $event->getThrowable()->getTraceAsString()]);
        $response = ResponseFactory::Erro($event->getThrowable());
        $event->setResponse($response->getResponse());
    }
    

}
