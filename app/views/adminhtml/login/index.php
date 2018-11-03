<?php if(isset($_COOKIE['message'])): ?>
<?php echo $_COOKIE['message'] ?>
<?php unset($_COOKIE['message']) ?>
<?php setcookie('message', '', time() - 3600); ?>
<?php endif; ?>
<div class="login-content">
    <div class="login-main-div">
        <form method="POST" action="<?= $this->getBaseUrlAdmin(); ?>login/login">
            <div class="login-inner">
                <p>Admin Login</p>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control required" name="username" />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control required" name="password" />
                </div>
                <input class="btn btn-default" type="submit" name="submit" value="Login" />
            </div>
        </form>
    </div>
</div>