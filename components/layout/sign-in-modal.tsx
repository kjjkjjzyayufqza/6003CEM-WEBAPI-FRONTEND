'use client';
import Modal from '@/components/shared/modal';
import { signIn } from 'next-auth/react';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  FC,
} from 'react';
import { LoadingDots, Google } from '@/components/shared/icons';
import Image from 'next/image';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, ConfigProvider, Space, Tabs, TabsProps, message } from 'antd';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { StyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/locale/en_US';
import { useRouter } from 'next/navigation';
import { RegisterPublic, SignInPublic, SignInStaff } from 'API/auth';

type LoginType = 'login' | 'register';

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const route = useRouter();
  const [type, setType] = useState<LoginType>('login');
  const [signInClicked, setSignInClicked] = useState(false);
  const items: TabsProps['items'] = [
    {
      key: 'login',
      label: '',
      children: <CusLoginForm />,
    },
    {
      key: 'register',
      label: '',
      children: <CusRegisterForm />,
    },
  ];
  return (
    <ConfigProvider locale={enUS}>
      <StyleProvider hashPriority='high'>
        <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
          <div className='w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200'>
            <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16'>
              <a href='https://precedent.dev'>
                <Image
                  src='/logo.png'
                  alt='Logo'
                  className='h-10 w-10 rounded-full'
                  width={20}
                  height={20}
                />
              </a>
              <h3 className='font-display text-2xl font-bold'>Sign In</h3>
              <p className='text-sm text-gray-500'>
                Sign in with your account and password, or use Google to sign
                in.
              </p>
            </div>
            <div className='bg-white'>
              <Tabs defaultActiveKey='1' items={items} activeKey={type}></Tabs>
            </div>
            <div className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16'>
              <button
                disabled={signInClicked}
                className={`${
                  signInClicked
                    ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                    : 'border border-gray-200 bg-white text-black hover:bg-gray-50'
                } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                onClick={() => {
                  setSignInClicked(true);
                  signIn('google');
                }}
              >
                {signInClicked ? (
                  <LoadingDots color='#808080' />
                ) : (
                  <>
                    <Google className='h-5 w-5' />
                    <p>Sign In with Google</p>
                  </>
                )}
              </button>
              <Button
                type={'text'}
                style={{ color: '#000000' }}
                onClick={() => {
                  setType(type == 'login' ? 'register' : 'login');
                }}
              >
                {type == 'login' ? (
                  <p className='underline'>Register</p>
                ) : (
                  <p className='underline'>Login</p>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </StyleProvider>
    </ConfigProvider>
  );
};

const CusLoginForm: FC = () => {
  return (
    <LoginForm
      // logo='https://github.githubassets.com/images/modules/logos_page/Octocat.png'
      // title='Github'
      // subTitle='全球最大的代码托管平台'
      onFinish={values => {
        console.log(values);
        SignInPublic({ email: values.email, password: values.password })
          .then(res => {
            console.log(res);
            PubSub.publish('SuccessMessage', 'Login successful');
          })
          .catch(err => {
            console.log(err);
            PubSub.publish(
              'WarningMessage',
              'Login failed, please check account and password!',
            );
          });
        return new Promise((resolve, rejects) => {
          resolve(true);
        });
      }}
      submitter={{
        render (props, dom) {
          return (
            <Button
              onClick={() => props.submit()}
              style={{ background: '#facc15', color: 'white' }}
              className='w-full'
              type={'primary'}
              size={'large'}
            >
              Login
            </Button>
          );
        },
      }}
    >
      <ProFormText
        name='email'
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Email'}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText.Password
        name='password'
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Password'}
        rules={[
          {
            required: true,
          },
        ]}
      />
    </LoginForm>
  );
};

const CusRegisterForm: FC = () => {
  return (
    <LoginForm
      // logo='https://github.githubassets.com/images/modules/logos_page/Octocat.png'
      // title='Github'
      // subTitle='全球最大的代码托管平台'
      onFinish={values => {
        if (values.rePassword != values.password) {
          message.warning('Inconsistent passwords');
        } else {
          RegisterPublic({
            name: '',
            photo: '',
            email: values.email,
            password: values.password,
          })
            .then(res => {
              message.success('Register Done');
            })
            .catch(err => {
              message.warning('Register Fail');
            });
        }
        return new Promise((resolve, rejects) => {
          resolve(true);
        });
      }}
      submitter={{
        render (props, dom) {
          return (
            <Button
              onClick={() => props.submit()}
              style={{ background: '#167ff', color: 'white' }}
              className='w-full'
              type={'primary'}
              size={'large'}
            >
              Register
            </Button>
          );
        },
      }}
    >
      <ProFormText
        name='email'
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Email'}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText.Password
        name='password'
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Password'}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText.Password
        name='rePassword'
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Re-Password'}
        rules={[
          {
            required: true,
          },
        ]}
      />
    </LoginForm>
  );
};

export function useSignInModal () {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
