const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const avatar = document.querySelector('.avatar');
const username = document.querySelector('.name');
const login = document.querySelector('.loginname');
const joinDate = document.querySelector('.joined');
const description = document.querySelector('.description');
const repos = document.querySelector('.repos h2');
const followers = document.querySelector('.followers h2');
const following = document.querySelector('.following h2');
const locationInfo = document.querySelector('.location-info');
const websiteInfo = document.querySelector('.website-info');
const twitterInfo = document.querySelector('.twitter-info');
const companyInfo = document.querySelector('.company-info');
const errorMsg = document.querySelector('.error-msg');
const infos = document.querySelectorAll('.info p');
const colorSwitchBtn = document.querySelector('.color-switcher');
const color = document.querySelector('.color-name');
const bodyTag = document.querySelector('body');
const mainBox = document.querySelector('.mainbox');
const repoBox = document.querySelector('.repobox');

const API_LINK = 'https://api.github.com/users/';

const getUser = () => {
	const user = input.value || 'octocat';
	const URL = API_LINK + user;

	axios
		.get(URL)
		.then((res) => {
			const gitAvatar = res.data.avatar_url;
			const gitUserName = res.data.name;
			const gitLogin = res.data.login;
			const gitDesc = res.data.bio || 'This profile has no bio';
			const gitRepos = res.data.public_repos;
			const gitFollowers = res.data.followers;
			const gitFollowing = res.data.following;
			const gitLocation = res.data.location || 'Not Avaliable';
			const gitWebsiteLink = res.data.blog;
			const gitWebsite = res.data.blog || 'Not Avaliable';
			const gitTwitter = res.data.twitter_username || 'Not Avaliable';
			const gitCompany = res.data.company || 'Not Avaliable';
			const date = new Date(res.data.created_at);

			avatar.setAttribute('src', gitAvatar);
			username.textContent = gitUserName;
			login.textContent = '@' + gitLogin;
			joinDate.textContent = 'Joined' + ' ' + date.toUTCString().slice(5, 16);
			description.textContent = gitDesc;
			repos.textContent = gitRepos;
			followers.textContent = gitFollowers;
			following.textContent = gitFollowing;
			locationInfo.textContent = gitLocation;
			websiteInfo.setAttribute('href', gitWebsiteLink);
			websiteInfo.textContent = gitWebsite;
			twitterInfo.textContent = gitTwitter;
			companyInfo.textContent = gitCompany;

			errorMsg.textContent = '';
			input.value = '';

			for (let info of infos) {
				if (info.textContent === 'Not Avaliable') {
					info.parentElement.style.opacity = 0.5;
				} else {
					info.parentElement.style.opacity = 1;
				}
			}
		})
		.catch(() => (errorMsg.textContent = 'No results'));
};

const colorSwitch = () => {
	if (color.classList.contains('dark')) {
		color.classList.remove('dark');
		bodyTag.classList.remove('dark');
        input.classList.remove('dark');
        mainBox.classList.remove('dark');
        repoBox.classList.remove('dark');
		color.textContent = 'Dark';
	} else {
		color.classList.add('dark');
		bodyTag.classList.add('dark');
		input.classList.add('dark');
		mainBox.classList.add('dark');
		repoBox.classList.add('dark');
		color.textContent = 'Light';
	}
}


const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		getUser();
	}
};

getUser();
input.addEventListener('keyup', enterKeyCheck);
searchBtn.addEventListener('click', getUser);
colorSwitchBtn.addEventListener('click', colorSwitch);
