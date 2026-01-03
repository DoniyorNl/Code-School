import * as LucideIcons from 'lucide-react'
import React, { CSSProperties } from 'react'
import { IconType } from 'react-icons'
import { BiErrorCircle, BiGitPullRequest, BiGrid } from 'react-icons/bi'
import {
	FaAngular,
	FaBook,
	FaCalendarAlt,
	FaChalkboardTeacher,
	FaCheckCircle,
	FaClock,
	FaEnvelope,
	FaFacebook,
	FaFigma,
	FaGraduationCap,
	FaInstagram,
	FaMapMarkerAlt,
	FaPaperPlane,
	FaPhone,
	FaReact,
	FaTelegram,
	FaVuejs,
	FaYoutube,
} from 'react-icons/fa'
import { GrStripe } from 'react-icons/gr'
import { MdArchitecture, MdOutlineSettingsInputComponent, MdStar } from 'react-icons/md'
import {
	SiAdobeillustrator,
	SiAdobephotoshop,
	SiJest,
	SiNextdotjs,
	SiNodedotjs,
	SiNuxtdotjs,
	SiRedux,
	SiTypescript,
} from 'react-icons/si'
import { TbApi, TbBrandNextjs } from 'react-icons/tb'

// Icon components from react-icons
const reactIconComponents: Record<string, IconType> = {
	FaReact,
	FaAngular,
	FaVuejs,
	SiNextdotjs,
	TbBrandNextjs,
	SiNodedotjs,
	SiNuxtdotjs,
	SiRedux,
	SiTypescript,
	FaFigma,
	SiAdobephotoshop,
	SiAdobeillustrator,
	FaInstagram,
	FaTelegram,
	FaFacebook,
	FaYoutube,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaBook,
	FaGraduationCap,
	FaChalkboardTeacher,
	FaPaperPlane,
	FaCheckCircle,
	GrStripe,
	TbApi,
	MdArchitecture,
	BiErrorCircle,
	BiGitPullRequest,
	BiGrid,
	MdOutlineSettingsInputComponent,
	SiJest,
	MdStar,
	FaCalendar: FaCalendarAlt,
	FaClock,
}

// Map remaining icons to Lucide
const lucideIconMapping: Record<string, keyof typeof LucideIcons> = {
	FaPaintBrush: 'Paintbrush',
	FaBullhorn: 'Megaphone',
	FaChartLine: 'TrendingUp',
	FaLightbulb: 'Lightbulb',
	FaTasks: 'ListChecks',
	FaBriefcase: 'Briefcase',
	FaSearchDollar: 'SearchCheck',
	FaCode: 'Code',
	FaCog: 'Settings',
	FaMobileAlt: 'Smartphone',
	FaDev: 'Code2',
	FaCheck: 'Check',
	FaUser: 'User',
	FaSearch: 'Search',
	FaFilter: 'Filter',
	FaRocket: 'Rocket',
	FaGlobe: 'Globe',
}

const allIcons = { ...reactIconComponents, ...lucideIconMapping }

export type IconName = keyof typeof allIcons

interface IconProps {
	name: IconName
	style?: CSSProperties
	className?: string
	title?: string
	'aria-label'?: string
	size?: number | string
	color?: string
}

const Icon: React.FC<IconProps> = ({
	name,
	style = {},
	className = '',
	title,
	'aria-label': ariaLabel,
	size,
	color,
}) => {
	// Check if it's a react-icon component
	if (reactIconComponents[name]) {
		const IconComponent = reactIconComponents[name] as React.ComponentType<any>
		const iconStyle: CSSProperties = {
			fontSize: size || style.fontSize || '1em',
			...style,
		}
		return React.createElement(IconComponent, {
			style: iconStyle,
			className,
			'aria-label': ariaLabel || title,
			color: color || style.color,
		})
	}

	// Otherwise, it's a lucide icon
	const lucideIconName = lucideIconMapping[name]

	if (!lucideIconName) {
		console.warn(`Icon "${name}" not found in mapping`)
		return null
	}

	const LucideIconComponent = LucideIcons[lucideIconName] as React.FC<any>

	if (!LucideIconComponent) {
		console.warn(`Lucide icon "${lucideIconName}" not found`)
		return null
	}

	const iconStyle: CSSProperties = {
		width: size || style.fontSize || '1em',
		height: size || style.fontSize || '1em',
		...style,
	}

	return (
		<LucideIconComponent
			style={iconStyle}
			className={className}
			aria-label={ariaLabel || title}
			color={color || style.color}
			strokeWidth={2}
		/>
	)
}

export default Icon
