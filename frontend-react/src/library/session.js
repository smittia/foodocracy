const Cookies = require('js-cookie');

function get_session_id()
{
	let session_id = get_session_id_from_cookie()
	if (session_id === undefined)
	{
		return false;	
	}
	return session_id
}

function get_session_id_from_cookie()
{
	return Cookies.get('session');
}

function store_session_id_in_cookie(session_id)
{
	Cookies.set('session', session_id);
}


export { get_session_id, store_session_id_in_cookie };