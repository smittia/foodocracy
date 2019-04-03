const Cookies = require('js-cookie');


function get_session_id()
{
	let session_id = get_session_id_from_cookie()
	if (session_id === undefined)
	{
		session_id = generate_session_id()
		store_session_id_in_cookie(session_id)
	}
	return session_id
}

function get_session_id_from_cookie()
{
	return Cookies.get('session');
}

function generate_session_id()
{
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function store_session_id_in_cookie(session_id)
{
	Cookies.set('session', session_id);
}


export { get_session_id };