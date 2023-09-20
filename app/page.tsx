import Feed from '@components/Feed';
import Link from 'next/link';


export default function Home() {
  return (
    <section >
      <div className="flex">
        <Link className='black_btn'
          href={"/add-dosage"}
        >
          Add long insulin
        </Link>
      </div>
      <Feed />
    </section>
  )
}
