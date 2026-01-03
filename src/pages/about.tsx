import { ScrollUp } from '../components'
import { AppContextProvider } from '../context/app.context'
import { PageCategory } from '../interfaces/page.interface'
import Footer from '../layout/footer/footer'
import Header from '../layout/header/header'
import Seo from '../layout/seo/seo'
import { AboutPageComponent } from '../page-components'

const About = (): JSX.Element => {
	return (
		<AppContextProvider menu={[]} firstCategory={PageCategory.Courses}>
			<Seo
				metaTitle='About Us - CodeSchool Academy'
				metaDescription='Learn more about CodeSchool Academy, our mission, and our commitment to providing quality online education.'
			>
				<Header />
				<div style={{ paddingTop: '80px', minHeight: '100vh' }}>
					<AboutPageComponent />
					<Footer />
					<ScrollUp />
				</div>
			</Seo>
		</AppContextProvider>
	)
}

export default About
