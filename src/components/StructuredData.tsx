import Head from 'next/head';
const defaultData = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'The church in sydney',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '169 Foxall Rd',
    addressLocality: 'North Kellyville',
    addressRegion: 'NSW',
    postalCode: '2155',
    addressCountry: 'Australia',
  },
  url: 'https://dev.churchinsydney.org',
  telephone: '+61 2 9341 2426',
  logo: 'https://dev.churchinsydney.org/images/logo.svg',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '12:00',
    },
  ],
};

export default function StructuredData() {
  return (
    <Head>
      <script
        key='structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultData) }}
      />
    </Head>
  );
}
