import quart.flask_patch

from quart import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, current_user
from app.auth import bp


@bp.route('/login', methods=['GET', 'POST'])
async def login():
    return await render_template(
        'auth/login.html', title='Sign In', form=None)


@bp.route('/logout')
async def logout():
    pass


@bp.route('/register', methods=['GET', 'POST'])
async def register():
    return await render_template(
        'auth/login.html', title='Register', form=None)


@bp.route('/reset_password_request', methods=['GET', 'POST'])
async def reset_password_request():
    pass


@bp.route('/reset_password/<token>', methods=['GET', 'POST'])
async def reset_password(token):
    pass
