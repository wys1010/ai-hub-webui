'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinning from '@/components/Spinning';

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const { status } = useSession();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const renderButtonContent = () => {
    if (loading) {
      return <Spinning className='size-[22px]' />;
    }
    if (status !== 'authenticated') {
      return t('loginRequired');
    }
    return t('submit');
  };

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    if (status !== 'authenticated') {
      toast.error('please login with google');
      signIn('google');
      return;
    }

    const errMsg = t('networkError');
    setLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.website,
          url: formData.url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // console.log('errorData', errorData);
        throw new Error(errorData.error || 'submit failed');
      }

      toast.success(t('success'));
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-3 mb-5 flex h-[449px] flex-col justify-between rounded-[12px] bg-[#2C2D36] px-3 py-5 lg:h-[557px] lg:w-[444px] lg:p-8',
          className,
        )}
      >
        <div className='space-y-3 lg:space-y-5'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>{t('website')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='AI Hub Tools'
                    className='input-border-pink h-[42px] w-full rounded-[8px] border-[0.5px] bg-dark-bg p-5'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={FORM_PLACEHOLDER}
                    className='input-border-pink h-[42px] w-full rounded-[8px] border-[0.5px] bg-dark-bg p-5'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-[10px] lg:gap-8'>
          <button
            type='submit'
            disabled={loading || status !== 'authenticated'}
            className={cn(
              'flex-center mt-auto h-[48px] w-full gap-4 rounded-[8px] bg-white text-center font-bold text-black hover:cursor-pointer hover:opacity-80',
              (loading || status !== 'authenticated') && 'opacity-50 hover:cursor-not-allowed',
            )}
          >
            {renderButtonContent()}
          </button>
          <p className='text-[13px] text-white/40'>
            {t('add')} <span className='text-white'>{WEBSITE_EXAMPLE}</span> {t('text')}
          </p>
        </div>
      </form>
    </Form>
  );
}
