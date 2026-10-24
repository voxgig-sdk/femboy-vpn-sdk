# FemboyVpn SDK exists test

import pytest
from femboyvpn_sdk import FemboyVpnSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FemboyVpnSDK.test(None, None)
        assert testsdk is not None
