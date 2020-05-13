from quart import render_template, request, jsonify
from server.errors import bp
from werkzeug.http import HTTP_STATUS_CODES


def error_response(status_code, message=None):
    payload = {
        'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')
    }
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response


def bad_request(message):
    return error_response(400, message)


def wants_json_response():
    return (request.accept_mimetypes['application/json'] 
                >= request.accept_mimetypes['text/html'])


@bp.app_errorhandler(404)
async def not_found_error(error):
    if wants_json_response():
        return error_response(404)
    return await render_template('errors/404.html'), 404


@bp.app_errorhandler(500)
async def internal_error(error):
    if wants_json_response():
        return error_response(500)
    return await render_template('errors/500.html'), 500
