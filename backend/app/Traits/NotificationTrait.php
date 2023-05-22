<?php

namespace App\Traits;

trait NotificationTrait
{
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     */
    public function via($notifiable)
    {
        $channes = method_exists($notifiable, 'getNotificationChannels') && $notifiable->getNotificationChannels() ? $notifiable->getNotificationChannels() : ['mail'];

        return $this->verifyChannels($channes);
    }

    /**
     * Return verified array of existing notification channels.
     *
     * @param  array  $channels
     * @return array
     */
    public function verifyChannels(array $channels)
    {
        foreach ($channels as $key => $channel) {
            if (! method_exists($this, 'to'.ucfirst($channel))) {
                unset($channels[$key]);
            }
        }

        return $channels;
    }
}
