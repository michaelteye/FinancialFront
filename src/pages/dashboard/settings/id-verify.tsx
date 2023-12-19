import { Button } from '@/components/button';
import { Flash } from '@/components/flash/flash';
import SvgSmallPlus from '@/components/icons/SmallPlus';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { useAuthStore } from '@/store/auth';
import { useMessagesStore } from '@/store/messages';
import classNames from 'classnames';
import * as yup from 'yup';
import { ApplicationStatus, IdOptions, verifyData } from './lib/types';
import { PropsWithChildren, useRef, useEffect, useState, ChangeEvent } from 'react';
import { Select } from '@/components/input/select';

const IdValidationSchema = yup.object().shape({
  idType: yup.string().required('This field is required'),
  idNumber: yup.string().required('This field is required'),
});

function Circle(props: PropsWithChildren<{}>) {
  return (
    <div className="h-10 w-10 rounded-full border-2 border-[#5C6278] flex items-center justify-center">
      {props.children}
    </div>
  );
}

export const IdVerification = () => {
  const [status, setStatus] = useState<ApplicationStatus>(ApplicationStatus.INCOMPLETE);
  const idRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const { displayMessage } = useMessagesStore();
  const { userProfile } = useAuthStore();
  const [errors, setErrors] = useState<any>({});
  // const { data: kyc, checkStatus } = useUserVerifyRequest();
  const [form, setForm] = useState<verifyData>({
    idType: 'GHANA_CARD',
    idNumber: '',
    idPicture: undefined,
    userPicture: undefined,
  });
  const [preview, setPreview] = useState<{
    id?: {
      src?: string;
      alt: string;
    };
    user?: {
      src?: string;
      alt: string;
    };
  }>({
    id: undefined,
    user: undefined,
  });

  const id = userProfile?.user?.files?.find((file) => file?.appType === 'ID_CARD');
  const userPic = userProfile?.user?.files?.find((file) => file?.appType === 'SELFIE');

  const setValue = (key: keyof verifyData, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  useEffect(() => {
    // const applicationStatus = data?.applicationStatus.toUpperCase();
    const applicationStatus =
      userProfile?.user?.files?.length! > 0 ? ApplicationStatus.SUCCESS : ApplicationStatus.INCOMPLETE;
    setStatus(applicationStatus);

    setForm({ ...form, idNumber: id?.idNumber, idType: id?.idType! });

    setPreview({
      id: {
        src: id ? id?.url[0] : '',
        alt: 'id picture',
      },
      user: {
        src: userPic ? userPic?.url[0] : '',
        alt: 'user picture',
      },
    });
  }, [userProfile]);

  const { submit: uploadVerificationData, isLoading: IsUploadingVerificationData } = useApi('/users/upload', {
    onSuccess() {
      displayMessage({
        title: 'ID has been set for verification',
        description: 'We will let you know when your verification goes through',
        variant: 'success',
      });

      // checkStatus();
    },
  });

  const uploadData = () => {
    const formData = new FormData();

    formData.append('user', form.userPicture!);
    formData.append('idPicture', form.idPicture!);
    formData.append('idType', form.idType!);
    formData.append('idNumber', form.idNumber!);

    uploadVerificationData(formData);
  };

  function clearError(key: string) {
    setErrors({ ...errors, [key]: '' });
  }

  const onIdImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const idPicture = event.target.files?.[0];

    setValue('idPicture', idPicture);
    setPreview({
      ...preview,
      id: {
        src: URL.createObjectURL(idPicture),
        alt: idPicture.name,
      },
    });
  };

  const onUserImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const userPicture = event.target.files?.[0];

    setValue('userPicture', userPicture);
    setPreview({
      ...preview,
      user: {
        src: URL.createObjectURL(userPicture),
        alt: userPicture.name,
      },
    });
  };

  const validate = async () => {
    IdValidationSchema.validate(form, {
      abortEarly: false,
    })
      .then(() => {
        uploadData();
      })
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  // if (isCheckingVerifyStatus) {
  //   return (
  //     <div className="justify-center top-1/2 translate-y-2/3 w-full my-6 flex items-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <Spacer className=" h-4" />

      <>
        {status === ApplicationStatus.INCOMPLETE ? (
          <Flash>Verify your identity documents to upgrade your account level to and access more features.</Flash>
        ) : null}

        {status === ApplicationStatus.SUCCESS ? (
          <Flash variant="success">You’ve successfully verified your identity.</Flash>
        ) : null}

        {status === ApplicationStatus.PROCESSING ? (
          <Flash variant="warning">We are processing your verification</Flash>
        ) : null}

        <Spacer className=" h-8" />

        <h2 className=" font-sans font-medium text-2xl text-neutral-400">ID Verification</h2>

        <Spacer className=" h-8" />

        <div className="flex lg:flex-row flex-col lg:space-x-6 lg:w-3/4 w-full">
          <Select
            label="National ID type*"
            value={form.idType!}
            onChange={(e) => setValue('idType', e.target.value)}
            options={IdOptions}
          />

          <Spacer className=" lg:hidden h-4" />

          <Input
            type="text"
            label="ID number"
            value={form.idNumber}
            error={errors?.idNumber}
            placeholder="Enter ID number here"
            onChange={(event) => {
              setValue('idNumber', event?.target.value);
              clearError('idNumber');
            }}
          />
        </div>

        <Spacer className=" h-8" />

        <div className="flex lg:flex-row flex-col lg:w-3/4 w-full lg:space-x-8">
          <div className="lg:w-1/2 w-full">
            <label className="font-sans font-semibold text-sm text-neutral-400">Upload ID image</label>

            <Spacer className=" h-2" />

            <button
              className={classNames(
                'w-full flex items-center justify-center bg-[#F7F8FF]  rounded-xl hover:shadow-sm',
                {
                  'py-14': !preview?.id?.src,
                  'p-4': preview.id,
                }
              )}
              onClick={() => {
                idRef?.current?.click();
              }}
            >
              {preview?.id?.src ? (
                <img src={preview?.id?.src} alt={preview?.id?.alt} />
              ) : (
                <div className=" flex flex-col space-y-4 items-center">
                  <Circle>
                    <SvgSmallPlus />
                  </Circle>

                  <p className="text-[#5C6278]">Click to upload image</p>
                </div>
              )}
            </button>
            {preview?.id?.src ? (
              <button
                onClick={() => {
                  idRef?.current?.click();
                }}
                className="underline text-primary-400 mt-4"
              >
                Upload a new ID
              </button>
            ) : null}
            <input type="file" onChange={onIdImageChange} ref={idRef} accept="image/*" className="hidden" />
          </div>

          <Spacer className=" lg:hidden h-8" />

          <div className="lg:w-1/3 w-full">
            <label className="font-sans font-semibold text-sm text-neutral-400">Upload a photo of yourself</label>

            <Spacer className=" h-2" />

            <button
              className={classNames(
                'w-full flex items-center justify-center bg-[#F7F8FF]  rounded-xl hover:shadow-sm',
                {
                  'py-14': !preview?.user?.src,
                  'p-4': preview.user,
                }
              )}
              onClick={() => {
                userRef?.current?.click();
              }}
            >
              {preview?.user?.src ? (
                <img src={preview?.user?.src} alt={preview?.user?.alt} />
              ) : (
                <div className=" flex flex-col space-y-4 items-center ">
                  <Circle>
                    <SvgSmallPlus />
                  </Circle>

                  <p className="text-[#5C6278]">Click to upload image</p>
                </div>
              )}
            </button>
            {preview?.user?.src ? (
              <button
                onClick={() => {
                  userRef?.current?.click();
                }}
                className="underline text-primary-400 mt-4"
              >
                Upload a new photo{' '}
              </button>
            ) : null}
          </div>

          <input type="file" onChange={onUserImageChange} ref={userRef} accept="image/*" className="hidden" />
        </div>

        <Spacer className=" h-8" />

        <Button
          loading={IsUploadingVerificationData}
          className="w-full sm:w-auto flex justify-center"
          onClick={() => {
            validate();
          }}
        >
          {status === ApplicationStatus.PROCESSING || status === ApplicationStatus.SUCCESS
            ? 'Update your information'
            : 'Verify Identity'}
        </Button>

        <Spacer className="sm:h-10 h-24" />
      </>
    </>
  );
};
