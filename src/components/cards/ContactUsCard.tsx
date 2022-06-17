import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';

import { AppContext } from '@/context/AppContext';

type ContactUsCardProps = {
  className?: string;
  title?: string;
  description: string;
};

export default function ContactUsCard({
  className,
  title,
  description,
}: ContactUsCardProps) {
  const { translations: t } = React.useContext(AppContext);
  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const [status, setStatus] = React.useState('idle');

  const onSubmit = async (data: { email: string }) => {
    setStatus('loading');

    axios
      .post<{ message: string }>('/api/newsletter/add', {
        email: data.email,
      })
      .then(() => {
        reset();
        // if (subscriber?.count) mutate({ count: subscriber.count + 1 });
        setStatus('success');
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          // if (error?.response?.data?.message?.includes('subscribed')) {
          //   setStatus('subscribed');
          // } else {
          //   setStatus('error');
          //   setErrMsg(
          //     error.response?.data.message ?? 'Something is wrong with the API.'
          //   );
          // }
        } else {
          setStatus('error');
        }
      });
  };

  return (
    <div className={clsx('rounded p-10', className)}>
      <h3 className='mt-2'>
        <Accent>{title ?? t['contact-us-title']}</Accent>
      </h3>
      <div className='mt-2 flex flex-col gap-10 md:flex-row'>
        <div className='basis-1/2'>
          <p className='mt-2 text-justify text-gray-700 dark:text-gray-300'>
            {description}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex basis-1/2 items-start'
        >
          <div className='space-y-5'>
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='text'
              placeholder={t['contact-us-name']}
              required
            />
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='text'
              placeholder={t['contact-us-phone']}
              required
            />
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='email'
              placeholder={t['contact-us-email']}
              required
            />
            <textarea
              {...register('email')}
              className={clsx(
                'mt-2',
                'h-40',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              placeholder={t['contact-us-leave-us-a-message']}
              required
            />

            <div className='flex flex-wrap justify-end md:!text-lg'>
              <div className='group relative right-2'>
                <div
                  className={clsx(
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <Button
                  type='submit'
                  isLoading={status === 'loading'}
                  className=''
                >
                  {t['common-submit']}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
