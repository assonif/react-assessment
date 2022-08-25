import type { GetStaticProps } from 'next';
import Head from 'next/head';


import formConfig from '../../config.json';
import { DataFile } from '../@types/formFiles';
import Form from '../components/FormContainer';
import { server } from '../config';

interface IHomeProps {
  formData: DataFile
}

const Home = ({ formData }: IHomeProps) => {


  return (
    <>
      <Head>
        <title>React Assessment</title>
      </Head>

      <Form formConfig={formConfig} formDataFile={formData} />
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/api/data`, {
    method: 'GET'
  })

  const formData = await response.json()

  return {
    props: {
      formData
    }
  }
}
